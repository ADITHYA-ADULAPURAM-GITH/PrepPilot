import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../config/env.js";
import { ProblemBank } from "../models/ProblemBank.js";

// externalId convention: stable, kebab-case slug of the canonical title,
// unique within source="internal". This is the long-term natural key for
// linking tracker Problem <-> ProblemBank without depending on title text.
// Every future problem added to this catalog (including the upcoming
// 500+ batch) MUST include a unique externalId following this pattern.
const CATALOG = [
  {
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that theyadd up to target.",
    difficulty: "Easy",
    topics: ["Arrays", "Hashing"],
    patterns: ["Hash Map Lookup"],
    examples: [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9" }],
    constraints: ["2 <= nums.length <= 10^4", "Only one valid answer exists"],
    starterCode: {
      javascript: "function twoSum(nums, target) {\n  \n}",
      python: "def two_sum(nums, target):\n    pass",
    },
    entryPoint: { javascript: "twoSum", python: "two_sum" },
    supportedLanguages: ["javascript", "python"],
    source: "internal",
    externalId: "two-sum",
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: "Given an array of prices, find the maximum profit from a single buy/sell transaction.",
    difficulty: "Easy",
    topics: ["Arrays"],
    patterns: ["Sliding Window", "Greedy"],
    examples: [{ input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy at 1, sell at 6" }],
    constraints: ["1 <= prices.length <= 10^5"],
    starterCode: {
      javascript: "function maxProfit(prices) {\n  \n}",
      python: "def max_profit(prices):\n    pass",
    },
    entryPoint: { javascript: "maxProfit", python: "max_profit" },
    supportedLanguages: ["javascript", "python"],
    source: "internal",
    externalId: "best-time-to-buy-and-sell-stock",
  },
  {
    title: "Contains Duplicate",
    description: "Given an integer array, return true if any value appears at least twice.",
    difficulty: "Easy",
    topics: ["Arrays", "Hashing"],
    patterns: ["Hash Set Lookup"],
    examples: [{ input: "nums = [1,2,3,1]", output: "true" }],
    constraints: ["1 <= nums.length <= 10^5"],
    starterCode: {
      javascript: "function containsDuplicate(nums) {\n  \n}",
      python: "def contains_duplicate(nums):\n    pass",
    },
    entryPoint: { javascript: "containsDuplicate", python: "contains_duplicate" },
    supportedLanguages: ["javascript", "python"],
    source: "internal",
    externalId: "contains-duplicate",
  },
  {
    title: "Maximum Subarray",
    description: "Find the contiguous subarray with the largest sum and return its sum.",
    difficulty: "Medium",
    topics: ["Arrays", "Dynamic Programming"],
    patterns: ["Kadane's Algorithm"],
    examples: [{ input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "[4,-1,2,1] has the largest sum" }],
    constraints: ["1 <= nums.length <= 10^5"],
    starterCode: {
      javascript: "function maxSubArray(nums) {\n  \n}",
      python: "def max_sub_array(nums):\n    pass",
    },
    entryPoint: { javascript: "maxSubArray", python: "max_sub_array" },
    supportedLanguages: ["javascript", "python"],
    source: "internal",
    externalId: "maximum-subarray",
  },
  {
    title: "3Sum",
    description: "Given an integer array, return all unique triplets thatsum to zero.",
    difficulty: "Medium",
    topics: ["Arrays", "Two Pointers"],
    patterns: ["Sort + Two Pointer"],
    examples: [{ input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" }],
    constraints: ["3 <= nums.length <= 3000"],
    starterCode: {
      javascript: "function threeSum(nums) {\n  \n}",
      python: "def three_sum(nums):\n    pass",
    },
    entryPoint: { javascript: "threeSum", python: "three_sum" },
    supportedLanguages: ["javascript", "python"],
    source: "internal",
    externalId: "3sum",
  },
];

async function seed() {
  await mongoose.connect(env.MONGO_URI);
  console.log("Connected to MongoDB for seeding...");
  for (const problem of CATALOG) {
    await ProblemBank.findOneAndUpdate(
      { title: problem.title },
      { ...problem, isActive: true },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`Seeded "${problem.title}" (${problem.difficulty}) externalId=${problem.externalId}`);
  }
  console.log("Seeding complete.");
  await mongoose.disconnect();
  process.exit(0);
}
seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});