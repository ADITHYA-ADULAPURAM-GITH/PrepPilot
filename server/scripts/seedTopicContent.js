import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../config/env.js";
import { Subject } from "../models/Subject.js";
import { Topic } from "../models/Topic.js";
import { Resource } from "../models/Resource.js";
import { Practice } from "../models/Practice.js";

import { operatingSystemsContent } from "./topic-content/os.js";
import { dbmsContent } from "./topic-content/dbms.js";
import { computerNetworksContent } from "./topic-content/cn.js";
import { oopContent } from "./topic-content/oop.js";
import { sqlContent } from "./topic-content/sql.js";
import { aptitudeContent } from "./topic-content/aptitude.js";
import { externalLinks } from "./topic-content/externalLinks.js";



const CONTENT_BY_SUBJECT = {
  "operating-systems": operatingSystemsContent,
  dbms: dbmsContent,
  "computer-networks": computerNetworksContent,
  oop: oopContent,
  sql: sqlContent,
  "aptitude-logical-reasoning": aptitudeContent,
};

async function seedTopicContent(subjectSlug, contentByTopic) {
  const subject = await Subject.findOne({ slug: subjectSlug });

  if (!subject) {
    throw new Error(
      `Subject "${subjectSlug}" not found. Run seedSubjects.js first.`
    );
  }

  let resourceCount = 0;
  let practiceCount = 0;

  for (const [topicTitle, content] of Object.entries(contentByTopic)) {
    const topicSlug = slugify(topicTitle);

    const topic = await Topic.findOne({
      subject: subject._id,
      slug: topicSlug,
    });

    if (!topic) {
      throw new Error(
        `Topic "${topicTitle}" not found under "${subject.name}". ` +
          `Run seedSubjects.js first.`
      );
    }

  await Resource.deleteMany({
  topic: topic._id,
  type: "link",
  title: /^Further reading:/i,
});

    const resources = [...(content.resources || [])];

const externalLink = externalLinks[subjectSlug]?.[topicTitle];

if (externalLink) {
  resources.push({
    type: "link",
    title: externalLink.title,
    body: "",
    url: externalLink.url,
    order: resources.length,
  });
}
    const practiceSets = content.practice || [];

    for (const resource of resources) {
      await Resource.findOneAndUpdate(
        {
          topic: topic._id,
          title: resource.title,
        },
        {
          ...resource,
          topic: topic._id,
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );

      resourceCount += 1;
      console.log(
        `  Resource: ${subject.name} -> ${topic.title} -> "${resource.title}"`
      );
    }

    for (const practice of practiceSets) {
      await Practice.findOneAndUpdate(
        {
          topic: topic._id,
          title: practice.title,
        },
        {
          ...practice,
          topic: topic._id,
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );

      practiceCount += 1;
      console.log(
        `  Practice: ${subject.name} -> ${topic.title} -> "${practice.title}"`
      );
    }
  }

  return {
    resourceCount,
    practiceCount,
  };
}

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function seed() {
  await mongoose.connect(env.MONGO_URI);
  console.log("Connected to MongoDB for topic-content seeding...\n");

  let totalResources = 0;
  let totalPracticeSets = 0;

  for (const [subjectSlug, content] of Object.entries(CONTENT_BY_SUBJECT)) {
    console.log(`\n=== ${subjectSlug} ===`);

    const result = await seedTopicContent(subjectSlug, content);

    totalResources += result.resourceCount;
    totalPracticeSets += result.practiceCount;

    console.log(
      `Completed ${subjectSlug}: ` +
        `${result.resourceCount} resources, ` +
        `${result.practiceCount} practice sets`
    );
  }

  console.log("\n========================================");
  console.log("Topic content seeding complete.");
  console.log(`Resources seeded: ${totalResources}`);
  console.log(`Practice sets seeded: ${totalPracticeSets}`);
  console.log("========================================");

  await mongoose.disconnect();
}

seed().catch(async (err) => {
  console.error("\nTopic content seeding failed:", err.message);

  try {
    await mongoose.disconnect();
  } catch {}

  process.exit(1);
});