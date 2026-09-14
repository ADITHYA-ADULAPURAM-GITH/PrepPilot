import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../config/env.js";
import { ProblemBank } from "../models/ProblemBank.js";
import { TestCase } from "../models/TestCase.js";

// Keyed by ProblemBank.externalId (stable natural key), not title.
const TEST_CASES_BY_EXTERNAL_ID = {
  "two-sum": [
    { input: JSON.stringify([[2, 7, 11, 15], 9]), expectedOutput: JSON.stringify([0, 1]), isHidden: false, order: 0 },
    { input: JSON.stringify([[3, 2, 4], 6]), expectedOutput: JSON.stringify([1, 2]), isHidden: false, order: 1 },
    { input: JSON.stringify([[3, 3], 6]), expectedOutput: JSON.stringify([0, 1]), isHidden: false, order: 2 },
    { input: JSON.stringify([[1, 2, 3, 4, 5], 100]), expectedOutput: JSON.stringify([]), isHidden: true, order: 3 },
    { input: JSON.stringify([[-3, 4, 3, 90], 0]), expectedOutput: JSON.stringify([0, 2]), isHidden: true, order: 4 },
    { input: JSON.stringify([[0, 4, 3, 0], 0]), expectedOutput: JSON.stringify([0, 3]), isHidden: true, order: 5 },
  ],

  "move-zeroes": [
    { input: JSON.stringify([[0, 1, 0, 3, 12]]), expectedOutput: JSON.stringify([1, 3, 12, 0, 0]), isHidden: false, order: 0 },
    { input: JSON.stringify([[1, 2, 3]]), expectedOutput: JSON.stringify([1, 2, 3]), isHidden: false, order: 1 },
    { input: JSON.stringify([[0]]), expectedOutput: JSON.stringify([0]), isHidden: true, order: 2 },
    { input: JSON.stringify([[0, 0, 0, 1]]), expectedOutput: JSON.stringify([1, 0, 0, 0]), isHidden: true, order: 3 },
    { input: JSON.stringify([[]]), expectedOutput: JSON.stringify([]), isHidden: true, order: 4 },
    { input: JSON.stringify([[1, 0, 1, 0, 1]]), expectedOutput: JSON.stringify([1, 1, 1, 0, 0]), isHidden: true, order: 5 },
  ],

  "binary-search": [
    { input: JSON.stringify([[-1, 0, 3, 5, 9, 12], 9]), expectedOutput: JSON.stringify(4), isHidden: false, order: 0 },
    { input: JSON.stringify([[-1, 0, 3, 5, 9, 12], 2]), expectedOutput: JSON.stringify(-1), isHidden: false, order: 1 },
    { input: JSON.stringify([[5], 5]), expectedOutput: JSON.stringify(0), isHidden: true, order: 2 },
    { input: JSON.stringify([[5], -5]), expectedOutput: JSON.stringify(-1), isHidden: true, order: 3 },
    { input: JSON.stringify([[], 3]), expectedOutput: JSON.stringify(-1), isHidden: true, order: 4 },
    { input: JSON.stringify([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10]), expectedOutput: JSON.stringify(9), isHidden: true, order: 5 },
  ],

  "reverse-linked-list": [
    { input: JSON.stringify([[1, 2, 3, 4, 5]]), expectedOutput: JSON.stringify([5, 4, 3, 2, 1]), isHidden: false, order: 0 },
    { input: JSON.stringify([[1, 2]]), expectedOutput: JSON.stringify([2, 1]), isHidden: false, order: 1 },
    { input: JSON.stringify([[1]]), expectedOutput: JSON.stringify([1]), isHidden: true, order: 2 },
    { input: JSON.stringify([[]]), expectedOutput: JSON.stringify([]), isHidden: true, order: 3 },
    { input: JSON.stringify([[1, 1, 2, 2, 3]]), expectedOutput: JSON.stringify([3, 2, 2, 1, 1]), isHidden: true, order: 4 },
    { input: JSON.stringify([[-3, 0, 7, 7, -1]]), expectedOutput: JSON.stringify([-1, 7, 7, 0, -3]), isHidden: true, order: 5 },
  ],
};

async function seed() {
  await mongoose.connect(env.MONGO_URI);
  console.log("Connected to MongoDB for seeding...");

  for (const [externalId, cases] of Object.entries(TEST_CASES_BY_EXTERNAL_ID)) {
    const problemDoc = await ProblemBank.findOne({ externalId });
    if (!problemDoc) {
      throw new Error(`ProblemBank document not found for externalId: "${externalId}"`);
    }

    for (const testCase of cases) {
      await TestCase.findOneAndUpdate(
        { problem: problemDoc._id, order: testCase.order },
        { ...testCase, problem: problemDoc._id },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`Seeded TestCase order=${testCase.order} isHidden=${testCase.isHidden} for "${externalId}"`);
    }
  }

  console.log("TestCase seeding complete.");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("TestCase seeding failed:", err);
  process.exit(1);
});