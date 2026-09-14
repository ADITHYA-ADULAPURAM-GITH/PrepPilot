// Pilot seed for the CS Subjects learning-content vertical slice
// (Resource + Practice). Targets exactly one existing topic —
// DBMS -> Indexing — so the flow can be verified end-to-end before
// scaling seed content across the rest of the catalog (Phase 2).
//
// Follows the same conventions as seedSubjects.js / seedProblemBank.js
// / seedMockTests.js:
//   - looks up the parent by its natural key (subject slug + topic
//     slug), never a hardcoded ObjectId
//   - upserts by natural key (topic + title), so re-running this after
//     editing CONTENT below updates existing docs instead of
//     duplicating them
//   - fails fast and loudly if the expected Subject/Topic doesn't
//     exist yet, rather than silently creating one (seedSubjects.js
//     owns the Subject/Topic catalog, not this script)
//
// Usage:  node scripts/seedTopicContent.js   (from the server/ directory)

import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../config/env.js";
import { Subject } from "../models/Subject.js";
import { Topic } from "../models/Topic.js";
import { Resource } from "../models/Resource.js";
import { Practice } from "../models/Practice.js";

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const TARGET_SUBJECT_SLUG = slugify("DBMS");
const TARGET_TOPIC_SLUG = slugify("Indexing");

const RESOURCES = [
  {
    type: "notes",
    title: "What Is an Index, and Why Use One?",
    body:
      "An index is a separate data structure that lets the database find rows " +
      "matching a condition without scanning the entire table. Think of it like " +
      "the index at the back of a textbook — instead of reading every page to find " +
      "a topic, you look it up and jump straight to the right page.\n\n" +
      "Without an index, a query like `SELECT * FROM users WHERE email = ...` has " +
      "to check every row (a full table scan). With an index on `email`, the " +
      "database can jump almost directly to the matching row(s).\n\n" +
      "The tradeoff: an index speeds up reads on the indexed column(s), but it " +
      "costs extra storage and slows down writes (INSERT/UPDATE/DELETE), because " +
      "every write has to also update the index.",
    order: 0,
  },
  {
    type: "notes",
    title: "B-Tree Indexes (the default in most databases)",
    body:
      "Most relational databases (MySQL's InnoDB, PostgreSQL, SQL Server) use a " +
      "B-Tree as the default index structure. A B-Tree keeps values sorted and " +
      "organizes them in a balanced tree, so a lookup, insert, or delete all take " +
      "O(log n) time — regardless of how large the table gets.\n\n" +
      "This is why B-Tree indexes are especially good for:\n" +
      "- Exact-match lookups (`WHERE id = 5`)\n" +
      "- Range queries (`WHERE created_at BETWEEN ... AND ...`)\n" +
      "- Sorting (`ORDER BY`) on the indexed column\n\n" +
      "They are less useful for equality checks on unordered data like exact " +
      "string matches inside larger text — that's what a different index type " +
      "(like a hash index or full-text index) is for.",
    order: 1,
  },
  {
    type: "notes",
    title: "Composite Indexes and Column Order",
    body:
      "A composite (multi-column) index is built across two or more columns " +
      "together, e.g. an index on `(last_name, first_name)`. The column order " +
      "matters: this index can efficiently serve queries filtering on " +
      "`last_name` alone, or on `last_name AND first_name` together, but it " +
      "generally cannot efficiently serve a query filtering on `first_name` " +
      "alone — the same way you can't efficiently search a phone book by first " +
      "name even though it's sorted by last name first.\n\n" +
      "A common interview question: 'if you have an index on (A, B), does it " +
      "help a query filtering only on B?' The honest answer is usually no.",
    order: 2,
  },
  {
    type: "link",
    title: "Further reading: Use The Index, Luke",
    body: "",
    url: "https://use-the-index-luke.com/",
    order: 3,
  },
];

const PRACTICE = {
  title: "Indexing — Quick Check",
  order: 0,
  questions: [
    {
      question: "What is the main benefit of adding an index to a frequently-queried column?",
      options: [
        "It reduces the storage size of the table",
        "It lets the database avoid scanning every row to find matches",
        "It automatically normalizes the table",
        "It prevents duplicate rows from being inserted",
      ],
      correctOptionIndex: 1,
      explanation:
        "An index lets the database jump to matching rows instead of scanning the " +
        "whole table — that's the core tradeoff: faster reads at the cost of extra " +
        "storage and slower writes.",
    },
    {
      question: "What is the typical time complexity of a lookup on a B-Tree index?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctOptionIndex: 1,
      explanation:
        "A B-Tree stays balanced, so lookups, inserts, and deletes all take " +
        "O(log n) time regardless of table size.",
    },
    {
      question:
        "You have a composite index on (last_name, first_name). Which query can it efficiently serve?",
      options: [
        "WHERE first_name = 'Alex'",
        "WHERE last_name = 'Sharma' AND first_name = 'Alex'",
        "WHERE first_name = 'Alex' AND last_name IS NULL",
        "ORDER BY first_name only",
      ],
      correctOptionIndex: 1,
      explanation:
        "Composite indexes are usable left-to-right by column order. Filtering on " +
        "the leading column (last_name), alone or combined with the next column, " +
        "can use the index; filtering on first_name alone generally can't.",
    },
    {
      question: "What is the main cost of adding an index to a table?",
      options: [
        "Queries become harder to write",
        "SELECT queries always get slower",
        "Writes (INSERT/UPDATE/DELETE) get slower because the index must also be updated",
        "The table can no longer be joined with other tables",
      ],
      correctOptionIndex: 2,
      explanation:
        "Every write has to update the index in addition to the table data, so " +
        "more indexes generally mean slower writes — this is the tradeoff against " +
        "faster reads.",
    },
  ],
};

async function seed() {
  await mongoose.connect(env.MONGO_URI);
  console.log("Connected to MongoDB for seeding...");

  const subject = await Subject.findOne({ slug: TARGET_SUBJECT_SLUG });
  if (!subject) {
    throw new Error(
      `Subject with slug "${TARGET_SUBJECT_SLUG}" not found. Run seedSubjects.js first.`
    );
  }

  const topic = await Topic.findOne({ subject: subject._id, slug: TARGET_TOPIC_SLUG });
  if (!topic) {
    throw new Error(
      `Topic with slug "${TARGET_TOPIC_SLUG}" not found under subject "${subject.name}". ` +
        `Run seedSubjects.js first, or confirm the topic title/slug matches.`
    );
  }

  console.log(`Target topic resolved: "${subject.name}" -> "${topic.title}" (${topic._id})`);

  for (const resource of RESOURCES) {
    await Resource.findOneAndUpdate(
      { topic: topic._id, title: resource.title },
      { ...resource, topic: topic._id },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`  Seeded resource: "${resource.title}"`);
  }

  await Practice.findOneAndUpdate(
    { topic: topic._id, title: PRACTICE.title },
    { ...PRACTICE, topic: topic._id },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  console.log(`  Seeded practice set: "${PRACTICE.title}" (${PRACTICE.questions.length} questions)`);

  console.log("Seeding complete.");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err.message);
  process.exit(1);
});