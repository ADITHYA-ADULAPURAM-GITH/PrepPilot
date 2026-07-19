import { Subject } from "../models/Subject.js";
import { Topic } from "../models/Topic.js";
import { UserTopicProgress } from "../models/UserTopicProgress.js";
import { ApiError } from "../utils/apiResponse.js";

// Placeholder until Topic gets a per-topic `revisionFrequencyDays` field
// (on the roadmap). isRevisionDue() below already prefers a per-topic
// value when present, so adding that field later requires no changes
// here — only topics that don't specify their own interval fall back
// to this default.
const DEFAULT_REVISION_INTERVAL_DAYS = 7;

function isRevisionDue(topic, progress, now) {
  if (!progress?.completed) return false;
  if (!progress.lastRevised) return true; // completed but never stamped — defensively treat as due
  const intervalDays = topic.revisionFrequencyDays || DEFAULT_REVISION_INTERVAL_DAYS;
  const dueAt = new Date(progress.lastRevised).getTime() + intervalDays * 24 * 60 * 60 * 1000;
  return now.getTime() >= dueAt;
}

function toSubjectSummary(s) {
  return { _id: s._id, name: s.name, slug: s.slug, icon: s.icon, progressPercent: s.progressPercent };
}

export const subjectService = {
  // Powers the Subject Dashboard cards, with placement-oriented
  // analytics per subject — not just a percentage. Fetches each
  // collection once and groups in memory, so this stays a fixed number
  // of queries regardless of how many subjects/topics the catalog grows to.
  async listWithProgress(userId) {
    const now = new Date();
    const subjects = await Subject.find().sort({ order: 1 });
    const subjectIds = subjects.map((s) => s._id);

    const topics = await Topic.find({ subject: { $in: subjectIds } }).sort({ order: 1 });
    const progressDocs = await UserTopicProgress.find({ user: userId, subject: { $in: subjectIds } });
    const progressByTopic = new Map(progressDocs.map((p) => [String(p.topic), p]));

    const topicsBySubject = new Map();
    for (const t of topics) {
      const key = String(t.subject);
      if (!topicsBySubject.has(key)) topicsBySubject.set(key, []);
      topicsBySubject.get(key).push(t);
    }

    return subjects.map((s) => {
      const subjectTopics = topicsBySubject.get(String(s._id)) || [];

      let completedTopics = 0;
      let importantCount = 0;
      let notesCount = 0;
      let lastRevised = null;
      const weakTopics = [];
      const revisionDueTopics = [];

      for (const topic of subjectTopics) {
        const progress = progressByTopic.get(String(topic._id));
        const completed = progress?.completed || false;
        const due = isRevisionDue(topic, progress, now);

        if (completed) completedTopics++;
        if (progress?.important) importantCount++;
        if (progress?.notes) notesCount++;
        if (progress?.lastRevised && (!lastRevised || progress.lastRevised > lastRevised)) {
          lastRevised = progress.lastRevised;
        }

        // "Weak" = never completed, OR completed but stale enough to
        // need revisiting — matches how a student would actually judge
        // their own weak spots, not just raw completion.
        if (!completed || due) {
          weakTopics.push({ _id: topic._id, title: topic.title });
        }
        if (due) {
          revisionDueTopics.push({ _id: topic._id, title: topic.title });
        }
      }

      const totalTopics = subjectTopics.length;

      return {
        _id: s._id,
        name: s.name,
        slug: s.slug,
        icon: s.icon,
        totalTopics,
        completedTopics,
        progressPercent: totalTopics ? Math.round((completedTopics / totalTopics) * 100) : 0,
        lastRevised,
        importantCount,
        notesCount,
        weakTopics: { count: weakTopics.length, topics: weakTopics },
        revisionDueTopics: { count: revisionDueTopics.length, topics: revisionDueTopics },
      };
    });
  },

  // Powers the Subject Details page: every topic in this subject,
  // merged with this user's progress (or defaults, if they've never
  // touched that topic).
  async getSubjectDetail(userId, subjectId) {
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      throw new ApiError(404, "Subject not found");
    }

    const topics = await Topic.find({ subject: subjectId }).sort({ order: 1 });
    const progressDocs = await UserTopicProgress.find({ user: userId, subject: subjectId });
    const progressByTopic = new Map(progressDocs.map((p) => [String(p.topic), p]));

    const topicsWithProgress = topics.map((t) => {
      const p = progressByTopic.get(String(t._id));
      return {
        _id: t._id,
        title: t.title,
        slug: t.slug,
        order: t.order,
        completed: p?.completed || false,
        important: p?.important || false,
        notes: p?.notes || "",
        lastRevised: p?.lastRevised || null,
      };
    });

    return {
      subject: { _id: subject._id, name: subject.name, slug: subject.slug, icon: subject.icon },
      topics: topicsWithProgress,
    };
  },

  // Upserts this user's progress for one topic. Every call — toggling
  // completed, toggling important, or saving notes — counts as
  // "touching" the topic and bumps lastRevised, same convention as the
  // DSA Tracker's revision logic.
  async upsertProgress(userId, subjectId, topicId, data) {
    const topic = await Topic.findOne({ _id: topicId, subject: subjectId });
    if (!topic) {
      throw new ApiError(404, "Topic not found in this subject");
    }

    const progress = await UserTopicProgress.findOneAndUpdate(
      { user: userId, topic: topicId },
      {
        $set: { ...data, lastRevised: new Date() },
        $setOnInsert: { user: userId, topic: topicId, subject: subjectId },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return progress;
  },

  // Powers the main app Dashboard's "CS Subjects" readiness line
  // (Step 6). Deliberately kept minimal and separate from
  // getOverallAnalytics below, so evolving the richer CS-Subjects-page
  // analytics never risks breaking the main Dashboard's contract.
  async getStats(userId) {
    const totalTopics = await Topic.countDocuments();
    const completedTopics = await UserTopicProgress.countDocuments({ user: userId, completed: true });
    const readinessScore = totalTopics ? Math.min(100, Math.round((completedTopics / totalTopics) * 100)) : 0;

    return { totalTopics, completedTopics, readinessScore };
  },

  // Powers the CS Subjects feature's own dashboard-level summary —
  // strongest/weakest subject, aggregate totals, streak, and a
  // suggested next subject. Reuses listWithProgress so subject-level
  // numbers are computed exactly once and stay consistent between the
  // cards and this summary.
  async getOverallAnalytics(userId) {
    const subjects = await this.listWithProgress(userId);

    const totalTopics = subjects.reduce((sum, s) => sum + s.totalTopics, 0);
    const totalCompletedTopics = subjects.reduce((sum, s) => sum + s.completedTopics, 0);
    const totalRemainingTopics = totalTopics - totalCompletedTopics;
    const totalRevisionDueTopics = subjects.reduce((sum, s) => sum + s.revisionDueTopics.count, 0);
    const overallReadiness = totalTopics ? Math.round((totalCompletedTopics / totalTopics) * 100) : 0;

    const ranked = subjects.filter((s) => s.totalTopics > 0);
    const strongestSubject = ranked.length
      ? ranked.reduce((a, b) => (b.progressPercent > a.progressPercent ? b : a))
      : null;
    const weakestSubject = ranked.length
      ? ranked.reduce((a, b) => (b.progressPercent < a.progressPercent ? b : a))
      : null;

    const studyStreak = await this.computeStudyStreak(userId);

    return {
      overallReadiness,
      totalCompletedTopics,
      totalRemainingTopics,
      totalRevisionDueTopics,
      studyStreak,
      strongestSubject: strongestSubject ? toSubjectSummary(strongestSubject) : null,
      weakestSubject: weakestSubject ? toSubjectSummary(weakestSubject) : null,
      // Same pick as weakestSubject today (lowest readiness is the most
      // actionable "study this next" signal available). Kept as its
      // own field — not just an alias — because the two represent
      // different concepts (current weak point vs. a recommendation),
      // and your planned AI-generated recommendations would only need
      // to change how *this* field is computed, without touching what
      // "weakest subject" means.
      suggestedNextSubject: weakestSubject ? toSubjectSummary(weakestSubject) : null,
    };
  },

  // Approximates a study streak from the distinct calendar days on
  // which this user touched CS Subjects (any completed/important/notes
  // update bumps a topic's updatedAt). This is a real computation, not
  // a fabricated number — but it's an approximation, not a dedicated
  // activity log: it only sees CS Subjects activity, and a user who
  // studies but doesn't toggle anything that day won't register. A
  // precise, cross-feature streak would need its own StudyActivity/
  // session-log collection written to by every feature, not just this one.
  async computeStudyStreak(userId) {
    const progressDocs = await UserTopicProgress.find({ user: userId }).select("updatedAt");
    if (!progressDocs.length) return 0;

    const studyDates = new Set(progressDocs.map((p) => new Date(p.updatedAt).toISOString().slice(0, 10)));

    const cursor = new Date();
    cursor.setUTCHours(0, 0, 0, 0);

    // If nothing's logged yet today, the streak may still be alive
    // through yesterday — the user just hasn't studied *yet* today.
    if (!studyDates.has(cursor.toISOString().slice(0, 10))) {
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }

    let streak = 0;
    while (studyDates.has(cursor.toISOString().slice(0, 10))) {
      streak++;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }

    return streak;
  },
};