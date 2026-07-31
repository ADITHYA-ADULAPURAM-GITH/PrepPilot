// One-time/idempotent catalog seeder for Companies — same convention as
// seedSubjects.js. Safe to re-run: companies are upserted by slug, so
// editing CATALOG below and re-running updates existing docs instead
// of duplicating them.
//
// Usage:  npm run seed:companies   (from the server/ directory)

import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../config/env.js";
import { Company } from "../models/Company.js";

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const CATALOG = [
  {
    name: "Microsoft",
    description:
      "Global technology leader behind Windows, Azure, and Office — one of the most consistent dream-company recruiters on Indian campuses.",
    eligibilityCriteria: "CGPA 7.0+, no active backlogs, all branches eligible",
    importantTopics: ["Data Structures & Algorithms", "System Design", "Object-Oriented Design", "Operating Systems", "DBMS"],
    interviewRounds: ["Online Assessment", "Technical Interview 1", "Technical Interview 2", "Hiring Manager Round"],
    tags: ["product-based", "dream-company", "mnc"],
  },
  {
    name: "Amazon",
    description:
      "E-commerce and cloud computing giant (AWS) — among the highest-volume tech recruiters on campus, known for its Leadership Principles.",
    eligibilityCriteria: "CGPA 7.0+, no active backlogs",
    importantTopics: ["Data Structures & Algorithms", "System Design", "Leadership Principles", "Object-Oriented Programming"],
    interviewRounds: ["Online Assessment", "Technical Interview 1", "Technical Interview 2", "Bar Raiser Round"],
    tags: ["product-based", "dream-company", "mnc"],
  },
  {
    name: "Google",
    description:
      "Search, cloud, and AI leader — one of the most selective and sought-after campus recruiters, with a strong emphasis on core CS fundamentals.",
    eligibilityCriteria: "CGPA 8.0+, strong DSA fundamentals, no active backlogs",
    importantTopics: ["Data Structures & Algorithms", "System Design", "Operating Systems", "Computer Networks"],
    interviewRounds: ["Online Assessment", "Technical Interview 1", "Technical Interview 2", "Googlyness & Leadership"],
    tags: ["product-based", "dream-company", "mnc"],
  },
  {
    name: "Adobe",
    description:
      "Creative software leader (Photoshop, Acrobat, Creative Cloud) with a strong, well-established campus SDE hiring pipeline.",
    eligibilityCriteria: "CGPA 7.5+, no active backlogs",
    importantTopics: ["Data Structures & Algorithms", "Object-Oriented Programming", "DBMS", "System Design"],
    interviewRounds: ["Online Assessment", "Technical Interview 1", "Technical Interview 2", "HR Interview"],
    tags: ["product-based", "mnc"],
  },
  {
    name: "Oracle",
    description:
      "Enterprise software and database technology leader — one of the largest recruiters for SDE and database-focused roles.",
    eligibilityCriteria: "CGPA 6.5+, no active backlogs",
    importantTopics: ["DBMS", "SQL", "Data Structures & Algorithms", "Object-Oriented Programming"],
    interviewRounds: ["Online Assessment", "Technical Interview 1", "Technical Interview 2", "HR Interview"],
    tags: ["product-based", "mnc", "core"],
  },
  {
    name: "PayPal",
    description: "Global digital payments platform hiring for backend and full-stack SDE roles.",
    eligibilityCriteria: "CGPA 7.0+, no active backlogs",
    importantTopics: ["Data Structures & Algorithms", "System Design", "Object-Oriented Programming", "Computer Networks"],
    interviewRounds: ["Online Assessment", "Technical Interview 1", "Technical Interview 2", "HR Interview"],
    tags: ["product-based", "mnc", "fintech"],
  },
  {
    name: "Atlassian",
    description:
      "Maker of Jira and Confluence — known for a strong engineering culture and a values-driven, rigorous interview process.",
    eligibilityCriteria: "CGPA 7.5+, no active backlogs",
    importantTopics: ["Data Structures & Algorithms", "System Design", "Object-Oriented Programming"],
    interviewRounds: ["Online Assessment", "Technical Interview 1", "Technical Interview 2", "Values Interview"],
    tags: ["product-based", "dream-company"],
  },
  {
    name: "ServiceNow",
    description: "Cloud workflow automation platform with a fast-growing engineering presence in India.",
    eligibilityCriteria: "CGPA 7.0+, no active backlogs",
    importantTopics: ["Data Structures & Algorithms", "Object-Oriented Programming", "DBMS", "System Design"],
    interviewRounds: ["Online Assessment", "Technical Interview 1", "Technical Interview 2", "HR Interview"],
    tags: ["product-based", "mnc"],
  },
  {
    name: "Nvidia",
    description: "GPU and AI computing leader hiring for software, driver, and systems engineering roles.",
    eligibilityCriteria: "CGPA 7.5+, CSE/ECE preferred, no active backlogs",
    importantTopics: ["Data Structures & Algorithms", "Operating Systems", "Computer Architecture", "C/C++"],
    interviewRounds: ["Online Assessment", "Technical Interview 1", "Technical Interview 2", "HR Interview"],
    tags: ["product-based", "core", "hardware"],
  },
  {
    name: "Qualcomm",
    description: "Semiconductor and telecommunications leader hiring for embedded systems and software roles.",
    eligibilityCriteria: "CGPA 7.0+, ECE/CSE preferred, no active backlogs",
    importantTopics: ["Computer Networks", "Operating Systems", "C/C++", "Data Structures & Algorithms"],
    interviewRounds: ["Online Assessment", "Technical Interview 1", "Technical Interview 2", "HR Interview"],
    tags: ["product-based", "core", "hardware"],
  },
];

async function seed() {
  await mongoose.connect(env.MONGO_URI);
  console.log("Connected to MongoDB for seeding...");

  for (let i = 0; i < CATALOG.length; i++) {
    const company = CATALOG[i];
    const slug = slugify(company.name);

    await Company.findOneAndUpdate(
      { slug },
      { ...company, slug, order: i },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`Seeded "${company.name}"`);
  }

  console.log("Seeding complete.");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});