// One-time/idempotent Mock Tests seeder, mirroring seedSubjects.js:
// tests are upserted by title, questions are upserted by (test, order)
// so re-running this after editing CATALOG below updates existing docs
// instead of duplicating them.
//
// Usage:  node scripts/seedMockTests.js   (from the server/ directory)

import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../config/env.js";
import { MockTest } from "../models/MockTest.js";
import { Question } from "../models/Question.js";

const CATALOG = [
  {
    title: "Aptitude Fundamentals",
    description: "Core quantitative and logical reasoning questions commonly asked in campus placements.",
    category: "Aptitude",
    difficulty: "Easy",
    durationMinutes: 20,
    companyName: null,
    questions: [
      {
        questionText: "A train 150m long is running at 60 km/hr. How long does it take to cross a pole?",
        options: ["9 seconds", "10 seconds", "12 seconds", "15 seconds"],
        correctOptionIndex: 0,
        explanation: "Speed = 60 km/hr = 16.67 m/s. Time = 150 / 16.67 ≈ 9 seconds.",
      },
      {
        questionText: "If the ratio of two numbers is 3:5 and their sum is 96, what is the smaller number?",
        options: ["30", "32", "36", "40"],
        correctOptionIndex: 2,
        explanation: "3x + 5x = 96 → x = 12. Smaller number = 3 × 12 = 36.",
      },
      {
        questionText: "A shopkeeper marks up an item by 25% and then gives a 10% discount. What is the net profit percentage?",
        options: ["10%", "12.5%", "15%", "17.5%"],
        correctOptionIndex: 1,
        explanation: "Net effect = 1.25 × 0.90 = 1.125, i.e. a 12.5% net profit.",
      },
      {
        questionText: "What is the compound interest on ₹10,000 at 10% per annum for 2 years?",
        options: ["₹2,000", "₹2,100", "₹2,200", "₹2,500"],
        correctOptionIndex: 1,
        explanation: "A = 10000(1.1)² = 12100. CI = 12100 − 10000 = ₹2,100.",
      },
      {
        questionText: "The average of 5 consecutive integers is 20. What is the largest integer?",
        options: ["20", "21", "22", "23"],
        correctOptionIndex: 2,
        explanation: "Consecutive integers centered on 20: 18, 19, 20, 21, 22. Largest is 22.",
      },
      {
        questionText: "A can complete a task in 12 days, B in 18 days. Working together, how many days will they take?",
        options: ["6 days", "7.2 days", "8 days", "9 days"],
        correctOptionIndex: 1,
        explanation: "Combined rate = 1/12 + 1/18 = 5/36 per day. Time = 36/5 = 7.2 days.",
      },
      {
        questionText: "What is the next number in the series: 2, 6, 12, 20, 30, ?",
        options: ["36", "40", "42", "44"],
        correctOptionIndex: 2,
        explanation: "Differences are 4, 6, 8, 10, 12 → 30 + 12 = 42.",
      },
      {
        questionText: "If 20% of a number is 50, what is 50% of that number?",
        options: ["100", "115", "125", "150"],
        correctOptionIndex: 2,
        explanation: "Number = 50 / 0.20 = 250. 50% of 250 = 125.",
      },
      {
        questionText: "Two pipes can fill a tank in 20 and 30 minutes respectively. A third pipe can empty it in 15 minutes. How long to fill the tank if all three are open?",
        options: ["40 minutes", "50 minutes", "60 minutes", "It never fills"],
        correctOptionIndex: 2,
        explanation: "Rate = 1/20 + 1/30 − 1/15 = 3/60 + 2/60 − 4/60 = 1/60. Time = 60 minutes.",
      },
      {
        questionText: "A sum of money doubles itself in 8 years at simple interest. What is the rate of interest?",
        options: ["10%", "12.5%", "15%", "20%"],
        correctOptionIndex: 1,
        explanation: "SI = P, so P = P × R × 8 / 100 → R = 12.5%.",
      },
      {
        questionText: "In a class, the ratio of boys to girls is 4:3. If there are 28 boys, how many girls are there?",
        options: ["18", "20", "21", "24"],
        correctOptionIndex: 2,
        explanation: "4 parts = 28 → 1 part = 7. Girls = 3 × 7 = 21.",
      },
      {
        questionText: "What is the probability of getting a sum of 7 when two fair dice are rolled?",
        options: ["1/6", "1/8", "1/9", "1/12"],
        correctOptionIndex: 0,
        explanation: "6 favorable outcomes out of 36 total = 6/36 = 1/6.",
      },
      {
        questionText: "A car covers a distance in 5 hours at 60 km/hr. At what speed should it travel to cover the same distance in 4 hours?",
        options: ["65 km/hr", "70 km/hr", "72 km/hr", "75 km/hr"],
        correctOptionIndex: 3,
        explanation: "Distance = 300 km. Speed for 4 hours = 300/4 = 75 km/hr.",
      },
      {
        questionText: "Find the odd one out: 8, 27, 64, 100, 125",
        options: ["27", "64", "100", "125"],
        correctOptionIndex: 2,
        explanation: "8, 27, 64, 125 are perfect cubes (2³, 3³, 4³, 5³); 100 is not.",
      },
      {
        questionText: "If A's salary is 25% more than B's, by what percentage is B's salary less than A's?",
        options: ["20%", "22.5%", "25%", "30%"],
        correctOptionIndex: 0,
        explanation: "If B = 100, A = 125. B is less than A by 25/125 = 20%.",
      },
    ],
  },
  {
    title: "SQL Query Mastery",
    description: "Practice writing and reasoning about SQL queries, joins, and database concepts.",
    category: "SQL",
    difficulty: "Medium",
    durationMinutes: 25,
    companyName: null,
    questions: [
      {
        questionText: "Which SQL clause is used to filter groups after a GROUP BY?",
        options: ["WHERE", "HAVING", "FILTER", "ORDER BY"],
        correctOptionIndex: 1,
        explanation: "HAVING filters aggregated groups; WHERE filters rows before grouping.",
      },
      {
        questionText: "Which type of JOIN returns all rows from the left table and matched rows from the right table?",
        options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "CROSS JOIN"],
        correctOptionIndex: 2,
        explanation: "LEFT JOIN keeps every row from the left table, filling unmatched right-side columns with NULL.",
      },
      {
        questionText: "What does the SQL command 'TRUNCATE TABLE' do?",
        options: [
          "Deletes the table structure and data",
          "Deletes all rows but keeps the table structure, cannot be rolled back in most DBs",
          "Deletes rows matching a WHERE clause",
          "Renames the table",
        ],
        correctOptionIndex: 1,
        explanation: "TRUNCATE removes all rows quickly by deallocating data pages; it's typically not row-by-row logged like DELETE.",
      },
      {
        questionText: "Which constraint ensures a column cannot have duplicate values but allows one NULL?",
        options: ["PRIMARY KEY", "UNIQUE", "CHECK", "FOREIGN KEY"],
        correctOptionIndex: 1,
        explanation: "UNIQUE enforces distinct values but, unlike PRIMARY KEY, permits a single NULL entry.",
      },
      {
        questionText: "What is the correct order of SQL execution (logical, not written) among these?",
        options: [
          "SELECT → FROM → WHERE → GROUP BY",
          "FROM → WHERE → GROUP BY → SELECT",
          "WHERE → FROM → SELECT → GROUP BY",
          "GROUP BY → FROM → WHERE → SELECT",
        ],
        correctOptionIndex: 1,
        explanation: "Logically, the FROM clause is evaluated first, then WHERE filters rows, then GROUP BY, then SELECT projects columns.",
      },
      {
        questionText: "Which function is used to combine rows from two queries and remove duplicates?",
        options: ["UNION ALL", "UNION", "JOIN", "INTERSECT"],
        correctOptionIndex: 1,
        explanation: "UNION removes duplicate rows across the combined result sets; UNION ALL keeps them.",
      },
      {
        questionText: "What does a composite index consist of?",
        options: [
          "An index on a single column with multiple values",
          "An index built on two or more columns together",
          "An index that spans multiple tables",
          "A temporary index created at query time",
        ],
        correctOptionIndex: 1,
        explanation: "A composite (or compound) index is built over multiple columns, useful when queries filter/sort by that combination.",
      },
      {
        questionText: "Which SQL statement is used to change existing data in a table?",
        options: ["ALTER", "UPDATE", "MODIFY", "CHANGE"],
        correctOptionIndex: 1,
        explanation: "UPDATE modifies existing row values; ALTER changes table structure, not data.",
      },
      {
        questionText: "What is a self-join used for?",
        options: [
          "Joining a table to itself to compare rows within the same table",
          "Joining a table with its own backup copy",
          "Automatically joining all foreign-key related tables",
          "Merging two databases",
        ],
        correctOptionIndex: 0,
        explanation: "A self-join treats one table as two logical copies (via aliases) to compare rows against each other, e.g. employees and their managers.",
      },
      {
        questionText: "Which normal form eliminates transitive dependency?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctOptionIndex: 2,
        explanation: "Third Normal Form (3NF) requires that non-key attributes depend only on the primary key, removing transitive dependencies.",
      },
      {
        questionText: "What does ACID stand for in database transactions?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Availability, Consistency, Integrity, Durability",
          "Atomicity, Concurrency, Isolation, Dependency",
          "Availability, Concurrency, Integrity, Dependency",
        ],
        correctOptionIndex: 0,
        explanation: "ACID properties guarantee reliable transaction processing: Atomicity, Consistency, Isolation, Durability.",
      },
      {
        questionText: "Which clause would you use to return only distinct department names from an Employees table?",
        options: [
          "SELECT UNIQUE department FROM Employees",
          "SELECT DISTINCT department FROM Employees",
          "SELECT department FROM Employees GROUP",
          "SELECT department FROM Employees ONLY",
        ],
        correctOptionIndex: 1,
        explanation: "DISTINCT removes duplicate rows from the result set for the specified column(s).",
      },
      {
        questionText: "What is the purpose of a FOREIGN KEY constraint?",
        options: [
          "To speed up SELECT queries",
          "To enforce a link between data in two tables and maintain referential integrity",
          "To automatically generate unique IDs",
          "To encrypt sensitive column data",
        ],
        correctOptionIndex: 1,
        explanation: "A FOREIGN KEY ensures values in one table correspond to valid values in another, preserving referential integrity.",
      },
      {
        questionText: "Which aggregate function would you use to count the number of non-NULL values in a column?",
        options: ["SUM()", "COUNT()", "TOTAL()", "LENGTH()"],
        correctOptionIndex: 1,
        explanation: "COUNT(column) counts non-NULL values in that column; COUNT(*) counts all rows regardless of NULLs.",
      },
      {
        questionText: "What does an EXPLAIN (or EXPLAIN PLAN) statement show in SQL?",
        options: [
          "The final result set of a query",
          "The execution plan the database engine will use to run a query",
          "A list of all tables in the database",
          "The syntax errors in a query",
        ],
        correctOptionIndex: 1,
        explanation: "EXPLAIN reveals how the query optimizer intends to execute a query — index usage, join order, scan type — useful for performance tuning.",
      },
    ],
  },
  {
    title: "Python Core Concepts",
    description: "Test your understanding of Python fundamentals, data structures, and common gotchas.",
    category: "Python",
    difficulty: "Medium",
    durationMinutes: 25,
    companyName: null,
    questions: [
      {
        questionText: "What is the output of: print(type([]))",
        options: ["<class 'array'>", "<class 'list'>", "<class 'tuple'>", "<class 'set'>"],
        correctOptionIndex: 1,
        explanation: "Square brackets [] create a list object in Python.",
      },
      {
        questionText: "Which of the following is mutable in Python?",
        options: ["tuple", "string", "list", "frozenset"],
        correctOptionIndex: 2,
        explanation: "Lists can be modified in place; tuples, strings, and frozensets are immutable.",
      },
      {
        questionText: "What does the following return: len({'a': 1, 'b': 2, 'a': 3})",
        options: ["3", "2", "1", "Error"],
        correctOptionIndex: 1,
        explanation: "Duplicate keys in a dict literal overwrite earlier ones — only 'a' and 'b' remain, so length is 2.",
      },
      {
        questionText: "What is the result of 3 // 2 in Python?",
        options: ["1.5", "1", "2", "1.0"],
        correctOptionIndex: 1,
        explanation: "// is floor (integer) division; 3 // 2 evaluates to 1.",
      },
      {
        questionText: "Which keyword is used to define a function in Python?",
        options: ["func", "def", "function", "lambda"],
        correctOptionIndex: 1,
        explanation: "'def' declares a named function; 'lambda' is only for anonymous inline functions.",
      },
      {
        questionText: "What will 'Hello'[::-1] evaluate to?",
        options: ["Hello", "olleH", "H", "Error"],
        correctOptionIndex: 1,
        explanation: "The slice [::-1] steps backward through the string, reversing it.",
      },
      {
        questionText: "What is the output of: print(2 == 2.0)",
        options: ["True", "False", "Error", "None"],
        correctOptionIndex: 0,
        explanation: "Python compares values, not types, with '==', so int 2 and float 2.0 are considered equal.",
      },
      {
        questionText: "Which of these correctly creates a set in Python?",
        options: ["{}", "set()", "[]", "()"],
        correctOptionIndex: 1,
        explanation: "{} creates an empty dict, not a set — set() is required for an empty set.",
      },
      {
        questionText: "What does the 'self' keyword refer to inside a Python class method?",
        options: [
          "The class itself",
          "The instance calling the method",
          "A reserved global variable",
          "The parent class",
        ],
        correctOptionIndex: 1,
        explanation: "'self' is a conventional name for the instance on which the method was called, giving access to its attributes.",
      },
      {
        questionText: "What is the output of: print([1, 2, 3] + [4, 5])",
        options: ["[1, 2, 3, 4, 5]", "[5, 7, 3]", "Error", "[1, 2, 3, [4, 5]]"],
        correctOptionIndex: 0,
        explanation: "The '+' operator concatenates two lists into one.",
      },
      {
        questionText: "Which of the following correctly opens a file for reading in Python?",
        options: [
          "open('file.txt', 'w')",
          "open('file.txt', 'r')",
          "read('file.txt')",
          "file.open('file.txt')",
        ],
        correctOptionIndex: 1,
        explanation: "open() with mode 'r' opens a file for reading; 'w' would open (and truncate) it for writing.",
      },
      {
        questionText: "What does list comprehension [x*2 for x in range(3)] produce?",
        options: ["[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]", "[1, 2, 3]"],
        correctOptionIndex: 0,
        explanation: "range(3) yields 0, 1, 2; doubling each gives [0, 2, 4].",
      },
      {
        questionText: "What is the difference between '==' and 'is' in Python?",
        options: [
          "They are exactly the same",
          "'==' compares values, 'is' compares object identity",
          "'is' compares values, '==' compares object identity",
          "'is' only works on integers",
        ],
        correctOptionIndex: 1,
        explanation: "'==' checks if values are equal; 'is' checks whether two references point to the exact same object in memory.",
      },
      {
        questionText: "What exception is raised when dividing by zero in Python?",
        options: ["ValueError", "ZeroDivisionError", "ArithmeticError", "TypeError"],
        correctOptionIndex: 1,
        explanation: "Python raises a ZeroDivisionError specifically for division or modulo by zero.",
      },
      {
        questionText: "What is the output of: print(bool([]))",
        options: ["True", "False", "None", "Error"],
        correctOptionIndex: 1,
        explanation: "Empty containers (list, dict, set, string) are falsy in Python; bool([]) evaluates to False.",
      },
    ],
  },
  {
    title: "DSA Problem Solving",
    description: "Conceptual questions on data structures, algorithms, and complexity analysis.",
    category: "DSA",
    difficulty: "Hard",
    durationMinutes: 30,
    companyName: null,
    questions: [
      {
        questionText: "What is the time complexity of searching in a balanced binary search tree?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctOptionIndex: 1,
        explanation: "A balanced BST halves the search space at each step, giving O(log n) search time.",
      },
      {
        questionText: "Which data structure is best suited for implementing a LRU cache?",
        options: [
          "Array only",
          "Hash map combined with a doubly linked list",
          "Binary search tree",
          "Min-heap",
        ],
        correctOptionIndex: 1,
        explanation: "A hash map gives O(1) lookup, while a doubly linked list gives O(1) reordering to track recency — together enabling O(1) LRU operations.",
      },
      {
        questionText: "What is the worst-case time complexity of QuickSort?",
        options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
        correctOptionIndex: 2,
        explanation: "QuickSort degrades to O(n²) when the pivot repeatedly splits the array into highly unbalanced partitions (e.g. already sorted input with a naive pivot choice).",
      },
      {
        questionText: "Which traversal of a binary tree visits nodes in sorted order for a BST?",
        options: ["Pre-order", "In-order", "Post-order", "Level-order"],
        correctOptionIndex: 1,
        explanation: "In-order traversal (left, root, right) visits BST nodes in ascending sorted order.",
      },
      {
        questionText: "What is the space complexity of the recursive Fibonacci solution (without memoization)?",
        options: ["O(1)", "O(n)", "O(2^n)", "O(log n)"],
        correctOptionIndex: 1,
        explanation: "Despite O(2^n) time, the recursion stack depth is only O(n), which bounds the space complexity.",
      },
      {
        questionText: "Which algorithm is typically used to find the shortest path in a weighted graph with non-negative edges?",
        options: ["DFS", "BFS", "Dijkstra's Algorithm", "Kruskal's Algorithm"],
        correctOptionIndex: 2,
        explanation: "Dijkstra's Algorithm finds shortest paths from a source in graphs with non-negative edge weights.",
      },
      {
        questionText: "What is the primary advantage of a hash table over a balanced BST for lookups?",
        options: [
          "Hash tables maintain sorted order",
          "Hash tables offer O(1) average-case lookup vs O(log n)",
          "Hash tables use less memory always",
          "Hash tables never have collisions",
        ],
        correctOptionIndex: 1,
        explanation: "Hash tables trade sorted ordering for average O(1) lookup, insert, and delete, versus O(log n) in a balanced BST.",
      },
      {
        questionText: "Which technique does Dynamic Programming rely on to improve efficiency over naive recursion?",
        options: [
          "Randomization",
          "Overlapping subproblems and optimal substructure via memoization/tabulation",
          "Parallel processing",
          "Divide and conquer without reuse",
        ],
        correctOptionIndex: 1,
        explanation: "DP stores results of overlapping subproblems (memoization or tabulation) to avoid recomputation, relying on optimal substructure.",
      },
      {
        questionText: "What is the time complexity of building a heap from an unsorted array?",
        options: ["O(n log n)", "O(n)", "O(log n)", "O(n²)"],
        correctOptionIndex: 1,
        explanation: "Bottom-up heapify runs in O(n) total, despite individual sift-down operations looking like O(log n) each.",
      },
      {
        questionText: "Which data structure uses LIFO (Last In, First Out) ordering?",
        options: ["Queue", "Stack", "Linked List", "Heap"],
        correctOptionIndex: 1,
        explanation: "A stack removes the most recently added element first, i.e. LIFO ordering.",
      },
      {
        questionText: "What is the time complexity of Binary Search on a sorted array?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correctOptionIndex: 1,
        explanation: "Binary search halves the search interval each step, giving O(log n) time.",
      },
      {
        questionText: "Which of the following best describes a Trie data structure?",
        options: [
          "A balanced binary tree for range queries",
          "A tree structure optimized for prefix-based string search",
          "A hash-based structure for O(1) lookups",
          "A graph structure for shortest paths",
        ],
        correctOptionIndex: 1,
        explanation: "A Trie stores strings character by character along tree edges, making prefix search and autocomplete efficient.",
      },
      {
        questionText: "What is the amortized time complexity of appending to a dynamic array (like Python's list)?",
        options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
        correctOptionIndex: 1,
        explanation: "Occasional O(n) resizes are spread out over many O(1) appends, giving O(1) amortized time.",
      },
      {
        questionText: "Which graph traversal algorithm uses a queue and explores level by level?",
        options: ["DFS", "BFS", "Topological Sort", "Dijkstra's Algorithm"],
        correctOptionIndex: 1,
        explanation: "Breadth-First Search uses a FIFO queue, visiting all neighbors at the current depth before moving deeper.",
      },
      {
        questionText: "What is the main difference between a Min-Heap and a Max-Heap?",
        options: [
          "Min-Heap allows duplicates, Max-Heap does not",
          "In a Min-Heap the smallest element is at the root; in a Max-Heap the largest is",
          "Max-Heap is always faster to build",
          "Min-Heap is implemented only with linked lists",
        ],
        correctOptionIndex: 1,
        explanation: "The heap property differs by direction: Min-Heap keeps the smallest value at the root, Max-Heap keeps the largest.",
      },
    ],
  },
  {
    title: "Amazon Interview Preparation",
    description: "Company-specific practice test covering topics commonly asked in Amazon's technical and aptitude rounds.",
    category: "Company-specific",
    difficulty: "Hard",
    durationMinutes: 30,
    companyName: "Amazon",
    questions: [
      {
        questionText: "Amazon's Leadership Principles include 'Customer Obsession.' Which of these best reflects that principle in a technical interview answer?",
        options: [
          "Prioritizing the fastest possible implementation regardless of edge cases",
          "Starting from the customer's problem and working backward to the solution",
          "Always choosing the most advanced algorithm available",
          "Focusing purely on code elegance",
        ],
        correctOptionIndex: 1,
        explanation: "Customer Obsession emphasizes working backward from customer needs rather than starting from internal capabilities.",
      },
      {
        questionText: "In a system design context, what does 'eventual consistency' mean?",
        options: [
          "All reads always return the latest write immediately",
          "The system guarantees data will become consistent across replicas over time, not instantly",
          "Data consistency is never guaranteed",
          "Only used in single-node databases",
        ],
        correctOptionIndex: 1,
        explanation: "Eventual consistency, common in distributed systems like DynamoDB, allows temporary inconsistency that resolves over time.",
      },
      {
        questionText: "What is the time complexity of finding an element in a hash-based data structure like a HashMap, on average?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        correctOptionIndex: 2,
        explanation: "Average-case HashMap lookups are O(1), assuming a good hash function and low collision rate.",
      },
      {
        questionText: "Given an array of integers, which approach efficiently finds if any two numbers sum to a target value?",
        options: [
          "Nested loops checking every pair, O(n²)",
          "Sorting then two-pointer scan, O(n log n)",
          "Single-pass hash set lookup, O(n)",
          "Both B and C are valid, with C generally faster",
        ],
        correctOptionIndex: 3,
        explanation: "A hash set achieves O(n) time; sorting plus two pointers achieves O(n log n) — both are valid, but the hash approach is typically faster.",
      },
      {
        questionText: "Which AWS service is most commonly associated with serverless compute?",
        options: ["EC2", "Lambda", "S3", "RDS"],
        correctOptionIndex: 1,
        explanation: "AWS Lambda runs code in response to events without provisioning or managing servers — the core of serverless compute.",
      },
      {
        questionText: "In an interview, how should the STAR method be structured when answering a behavioral question?",
        options: [
          "Solution, Team, Action, Result",
          "Situation, Task, Action, Result",
          "Story, Task, Analysis, Review",
          "Situation, Team, Analysis, Recommendation",
        ],
        correctOptionIndex: 1,
        explanation: "STAR stands for Situation, Task, Action, Result — a structured way to answer behavioral interview questions.",
      },
      {
        questionText: "What is the primary purpose of a load balancer in a distributed system?",
        options: [
          "To encrypt traffic between services",
          "To distribute incoming requests across multiple servers to avoid overload",
          "To store frequently accessed data",
          "To compress data before transmission",
        ],
        correctOptionIndex: 1,
        explanation: "A load balancer distributes traffic across multiple backend instances, improving availability and preventing any single server from being overwhelmed.",
      },
      {
        questionText: "Which data structure would be most efficient for implementing Amazon's 'frequently bought together' recommendation lookup by product ID?",
        options: ["Linked List", "Hash Map", "Stack", "Binary Search Tree without balancing"],
        correctOptionIndex: 1,
        explanation: "A hash map provides O(1) average lookup by product ID, ideal for fast recommendation retrieval.",
      },
      {
        questionText: "What does horizontal scaling mean, as opposed to vertical scaling?",
        options: [
          "Increasing the power (CPU/RAM) of a single server",
          "Adding more machines/servers to distribute load",
          "Reducing the number of servers to save cost",
          "Migrating from cloud to on-premise",
        ],
        correctOptionIndex: 1,
        explanation: "Horizontal scaling adds more servers to share load; vertical scaling increases the resources of one existing server.",
      },
      {
        questionText: "In Amazon's Leadership Principle 'Bias for Action,' what is most valued?",
        options: [
          "Waiting for complete information before deciding",
          "Taking calculated risks and making reversible decisions quickly",
          "Escalating every decision to senior leadership",
          "Avoiding action until consensus is reached",
        ],
        correctOptionIndex: 1,
        explanation: "Bias for Action values speed in decision-making, especially for decisions that can be reversed if wrong.",
      },
      {
        questionText: "What is the main benefit of using a Content Delivery Network (CDN)?",
        options: [
          "It replaces the need for a database",
          "It caches content closer to users geographically, reducing latency",
          "It automatically scales backend compute",
          "It encrypts all stored data",
        ],
        correctOptionIndex: 1,
        explanation: "A CDN caches static content at edge locations near users, reducing latency and load on origin servers.",
      },
      {
        questionText: "Given a large dataset that doesn't fit in memory, which approach is most appropriate for sorting it?",
        options: ["QuickSort", "Bubble Sort", "External Merge Sort", "Insertion Sort"],
        correctOptionIndex: 2,
        explanation: "External Merge Sort is designed for data too large to fit in memory, sorting chunks on disk and merging them.",
      },
      {
        questionText: "What is a race condition in concurrent programming?",
        options: [
          "When two threads compete for CPU priority",
          "When the outcome of a program depends on the unpredictable timing of concurrent operations",
          "When a program runs faster than expected",
          "When memory is allocated too quickly",
        ],
        correctOptionIndex: 1,
        explanation: "A race condition occurs when concurrent operations access shared data and the result depends on their relative timing, leading to unpredictable behavior.",
      },
      {
        questionText: "Which of these is a NoSQL database offered by AWS?",
        options: ["RDS", "DynamoDB", "Redshift", "Aurora"],
        correctOptionIndex: 1,
        explanation: "DynamoDB is AWS's managed NoSQL key-value and document database, built for high scalability.",
      },
      {
        questionText: "In Amazon's Leadership Principle 'Ownership,' what behavior is expected of employees?",
        options: [
          "Only focusing on tasks explicitly assigned to them",
          "Thinking long-term and acting on behalf of the entire company, not just their own team",
          "Avoiding responsibility for outcomes outside their direct control",
          "Delegating all decisions upward",
        ],
        correctOptionIndex: 1,
        explanation: "Ownership means thinking beyond one's immediate role and acting in the long-term interest of the whole company.",
      },
    ],
  },
];

async function seed() {
  await mongoose.connect(env.MONGO_URI);
  console.log("Connected to MongoDB for seeding...");

  for (const testData of CATALOG) {
    const { questions, ...testFields } = testData;

    const test = await MockTest.findOneAndUpdate(
      { title: testFields.title },
      { ...testFields, totalQuestions: questions.length },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Full delete-and-reinsert for this test's questions, rather than
    // upserting by {test, order}: guarantees the DB always matches
    // CATALOG exactly, with no risk of orphaned questions left behind
    // when CATALOG shrinks or reorders.
    await Question.deleteMany({ test: test._id });

    const questionDocs = questions.map((q, i) => ({
      ...q,
      test: test._id,
      order: i,
      type: "mcq",
    }));
    await Question.insertMany(questionDocs);

    console.log(`Seeded "${test.title}" (${testFields.category}) with ${questions.length} questions`);
  }

  console.log("Seeding complete.");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});