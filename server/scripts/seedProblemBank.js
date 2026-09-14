import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../config/env.js";
import { ProblemBank } from "../models/ProblemBank.js";

// externalId is the stable natural key for ProblemBank records (kebab-case
// slug, unique within source="internal"). Upserts key off externalId, not
// title, so renaming a title later never creates a duplicate document.
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
    externalUrl: "https://leetcode.com/problems/two-sum/",
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
    externalUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
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
    externalUrl: "https://leetcode.com/problems/contains-duplicate/",
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
    externalUrl: "https://leetcode.com/problems/maximum-subarray/",
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
    externalUrl: "https://leetcode.com/problems/3sum/",
  },
  {
    title: "Move Zeroes",
    description:
      "Given an integer array nums, move all 0's to the end while maintaining the relative order of the non-zero elements. Return the resulting array.",
    difficulty: "Easy",
    topics: ["Arrays", "Two Pointers"],
    patterns: ["Two Pointers"],
    examples: [
      { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]" },
      { input: "nums = [1,2,3]", output: "[1,2,3]", explanation: "No zeros present, array is unchanged" },
    ],
    constraints: ["1 <= nums.length <= 10^4", "-2^31 <= nums[i] <= 2^31 - 1"],
    starterCode: {
      javascript: "function moveZeroes(nums) {\n  \n}",
      python: "def move_zeroes(nums):\n    pass",
    },
    entryPoint: { javascript: "moveZeroes", python: "move_zeroes" },
    supportedLanguages: ["javascript", "python"],
    source: "internal",
    externalId: "move-zeroes",
    externalUrl: "https://leetcode.com/problems/move-zeroes/",
  },
  {
    title: "Binary Search",
    description:
      "Given a sorted array of unique integers nums and an integer target, return the index of target if it exists, otherwise return -1. Must run in O(log n) time.",
    difficulty: "Easy",
    topics: ["Binary Search"],
    patterns: ["Binary Search"],
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist in nums" },
    ],
    constraints: ["1 <= nums.length <= 10^4", "nums is sorted in ascending order with unique elements"],
    starterCode: {
      javascript: "function search(nums, target) {\n  \n}",
      python: "def search(nums, target):\n    pass",
    },
    entryPoint: { javascript: "search", python: "search" },
    supportedLanguages: ["javascript", "python"],
    source: "internal",
    externalId: "binary-search",
    externalUrl: "https://leetcode.com/problems/binary-search/",
  },
  {
    title: "Reverse Linked List",
    description:
      "Given the head of a singly linked list (provided here as a plain array of values), reverse the list and return the values in reversed order as an array. Starter code includes ListNode plus array<->list helpers — implement the reversal using actual node pointers.",
    difficulty: "Easy",
    topics: ["Linked List"],
    patterns: ["Iterative Pointer Reversal"],
    examples: [
      { input: "list = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "list = [1,2]", output: "[2,1]" },
    ],
    constraints: ["0 <= list.length <= 5000", "-5000 <= list[i] <= 5000"],
    starterCode: {
      javascript:
        "class ListNode {\n  constructor(val, next = null) {\n    this.val = val;\n    this.next = next;\n  }\n}\n\nfunction arrayToList(arr) {\n  const dummy = new ListNode(0);\n  let curr = dummy;\n  for (const v of arr) {\n    curr.next = new ListNode(v);\n    curr = curr.next;\n  }\n  return dummy.next;\n}\n\nfunction listToArray(head) {\n  const res = [];\n  while (head) {\n    res.push(head.val);\n    head = head.next;\n  }\n  return res;\n}\n\nfunction reverseList(arr) {\n  let head = arrayToList(arr);\n  // TODO: reverse the linked list starting at head using node pointers,\n  // then return listToArray(newHead)\n  \n}",
      python:
        "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\n\ndef array_to_list(arr):\n    dummy = ListNode(0)\n    curr = dummy\n    for v in arr:\n        curr.next = ListNode(v)\n        curr = curr.next\n    return dummy.next\n\n\ndef list_to_array(head):\n    res = []\n    while head:\n        res.append(head.val)\n        head = head.next\n    return res\n\n\ndef reverse_list(arr):\n    head = array_to_list(arr)\n    # TODO: reverse the linked list starting at head using node pointers,\n    # then return list_to_array(new_head)\n    pass",
    },
    entryPoint: { javascript: "reverseList", python: "reverse_list" },
    supportedLanguages: ["javascript", "python"],
    source: "internal",
    externalId: "reverse-linked-list",
    externalUrl: "https://leetcode.com/problems/reverse-linked-list/",
  },
];

async function seed() {
  await mongoose.connect(env.MONGO_URI);
  console.log("Connected to MongoDB for seeding...");
  for (const problem of CATALOG) {
    await ProblemBank.findOneAndUpdate(
      { externalId: problem.externalId },
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