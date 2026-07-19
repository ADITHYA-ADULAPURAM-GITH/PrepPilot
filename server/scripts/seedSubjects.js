// One-time/idempotent catalog seeder. Safe to re-run: subjects and
// topics are upserted by slug, so running this again after editing
// CATALOG below (adding a topic, renaming one, adding new fields once
// they exist on the schema) updates existing docs rather than
// duplicating them.
//
// Usage:  npm run seed   (from the server/ directory)

import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../config/env.js";
import { Subject } from "../models/Subject.js";
import { Topic } from "../models/Topic.js";

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const CATALOG = [
  {
    name: "Operating Systems",
    icon: "Cpu",
    topics: [
      "Processes",
      "Threads",
      "CPU Scheduling",
      "Synchronization",
      "Deadlocks",
      "Memory Management",
      "Paging",
      "Virtual Memory",
      "File Systems",
      "Disk Scheduling",
    ],
  },
  {
    name: "DBMS",
    icon: "Database",
    topics: [
      "ER Model",
      "Normalization",
      "Transactions & ACID",
      "Indexing",
      "Joins",
      "SQL Queries",
      "Concurrency Control",
      "Deadlocks in DBMS",
      "Storage & File Structure",
      "Query Processing",
    ],
  },
  {
    name: "Computer Networks",
    icon: "Network",
    topics: [
      "OSI Model",
      "TCP/IP Model",
      "IP Addressing",
      "Routing",
      "Congestion Control",
      "TCP vs UDP",
      "DNS",
      "HTTP/HTTPS",
      "Network Security",
      "Sockets",
    ],
  },
  {
    name: "OOP",
    icon: "Box",
    topics: [
      "Classes & Objects",
      "Inheritance",
      "Polymorphism",
      "Encapsulation",
      "Abstraction",
      "Constructors & Destructors",
      "Interfaces & Abstract Classes",
      "Method Overloading & Overriding",
      "Design Patterns",
      "SOLID Principles",
    ],
  },
  {
    name: "SQL",
    icon: "Table",
    topics: [
      "SELECT Queries",
      "Joins",
      "Subqueries",
      "Aggregate Functions",
      "GROUP BY & HAVING",
      "Indexes",
      "Views",
      "Stored Procedures",
      "Transactions",
      "Query Optimization",
    ],
  },
];

async function seed() {
  await mongoose.connect(env.MONGO_URI);
  console.log("Connected to MongoDB for seeding...");

  for (let i = 0; i < CATALOG.length; i++) {
    const { name, icon, topics } = CATALOG[i];
    const slug = slugify(name);

    const subject = await Subject.findOneAndUpdate(
      { slug },
      { name, slug, icon, order: i },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    for (let t = 0; t < topics.length; t++) {
      const title = topics[t];
      const topicSlug = slugify(title);
      await Topic.findOneAndUpdate(
        { subject: subject._id, slug: topicSlug },
        { subject: subject._id, title, slug: topicSlug, order: t },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    console.log(`Seeded "${name}" with ${topics.length} topics`);
  }

  console.log("Seeding complete.");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});