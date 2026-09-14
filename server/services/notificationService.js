import { Notification } from "../models/Notification.js";
import { ApiError } from "../utils/apiResponse.js";

const DEFAULT_LIMIT = 10;

export const notificationService = {
  async list(userId, { limit = DEFAULT_LIMIT } = {}) {
    return Notification.find({ user: userId }).sort({ createdAt: -1 }).limit(limit);
  },

  async getUnreadCount(userId) {
    return Notification.countDocuments({ user: userId, isRead: false });
  },

  async markAsRead(userId, notificationId) {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      { isRead: true, readAt: new Date() },
      { new: true }
    );
    if (!notification) {
      throw new ApiError(404, "Notification not found");
    }
    return notification;
  },

  async markAllAsRead(userId) {
    await Notification.updateMany(
      { user: userId, isRead: false },
      { isRead: true, readAt: new Date() }
    );
    return { success: true };
  },

  // --- Creation helpers, called from mockTestService / problemProgressService
  // after a real event has already completed successfully.
  //
  // These deliberately swallow their own errors. A notification write
  // failing must never cause the primary operation (mock-test submit,
  // DSA progress update) to fail or roll back — that's the isolation
  // requirement from the approved plan.

  async createMockTestResultNotification(userId, { attemptId, testTitle, score, totalQuestions }) {
    try {
      await Notification.create({
        user: userId,
        type: "mock-test-result",
        title: "Mock test result ready",
        message: `You scored ${score}/${totalQuestions} on "${testTitle}".`,
        link: `/mock-tests/attempts/${attemptId}`,
        relatedId: attemptId,
      });
    } catch (err) {
      console.error("Failed to create mock-test-result notification:", err);
    }
  },

  async createDsaMilestoneNotification(userId, { problemId, problemTitle }) {
    try {
      await Notification.create({
        user: userId,
        type: "dsa-milestone",
        title: "Problem solved",
        message: `You solved "${problemTitle}". Nice work.`,
        link: `/dsa-tracker/${problemId}`,
        relatedId: problemId,
      });
    } catch (err) {
      console.error("Failed to create dsa-milestone notification:", err);
    }
  },
};