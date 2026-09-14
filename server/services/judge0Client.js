import { env } from "../config/env.js";

const JUDGE0_API_URL = env.JUDGE0_API_URL;
const JUDGE0_API_KEY = env.JUDGE0_API_KEY;
const JUDGE0_API_HOST = env.JUDGE0_API_HOST;

const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
};

const POLL_INTERVAL_MS = 1000;
const MAX_POLL_TIME_MS = 15000;

const EXECUTION_LIMITS = {
  cpu_time_limit: 2,
  wall_time_limit: 5,
  memory_limit: 128000,
};

export class Judge0UnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = "Judge0UnavailableError";
  }
}

export class Judge0TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = "Judge0TimeoutError";
  }
}

function assertConfigured() {
  if (!JUDGE0_API_URL) {
    throw new Judge0UnavailableError("Judge0 execution service is not configured");
  }
}

function requestHeaders() {
  const headers = { "Content-Type": "application/json" };
  if (JUDGE0_API_KEY) headers["X-RapidAPI-Key"] = JUDGE0_API_KEY;
  if (JUDGE0_API_HOST) headers["x-rapidapi-host"] = JUDGE0_API_HOST;
  return headers;
}

function encodeBase64(value) {
  return Buffer.from(value ?? "", "utf8").toString("base64");
}

function decodeBase64(value) {
  if (value === null || value === undefined) return null;
  return Buffer.from(value, "base64").toString("utf8");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function createSubmission({ sourceCode, language, stdin }) {
  assertConfigured();

  const languageId = LANGUAGE_IDS[language];
  if (!languageId) {
    throw new Judge0UnavailableError(`Unsupported language: ${language}`);
  }

  let response;
  try {
    response = await fetch(`${JUDGE0_API_URL}/submissions/?base64_encoded=true&wait=false`, {
      method: "POST",
      headers: requestHeaders(),
      body: JSON.stringify({
        source_code: encodeBase64(sourceCode),
        language_id: languageId,
        stdin: encodeBase64(stdin),
        ...EXECUTION_LIMITS,
      }),
    });
  } catch {
    throw new Judge0UnavailableError("Failed to reach Judge0");
  }

  if (!response.ok) {
    throw new Judge0UnavailableError(`Judge0 submission creation failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!data.token) {
    throw new Judge0UnavailableError("Judge0 did not return a submission token");
  }

  return data.token;
}

async function getSubmission(token) {
  assertConfigured();

  let response;
  try {
    response = await fetch(`${JUDGE0_API_URL}/submissions/${token}?base64_encoded=true`, {
      method: "GET",
      headers: requestHeaders(),
    });
  } catch {
    throw new Judge0UnavailableError("Failed to reach Judge0");
  }

  if (!response.ok) {
    throw new Judge0UnavailableError(`Judge0 submission fetch failed with status ${response.status}`);
  }

  const data = await response.json();

  return {
    statusId: data.status?.id ?? null,
    statusDescription: data.status?.description ?? null,
    stdout: decodeBase64(data.stdout),
    stderr: decodeBase64(data.stderr),
    compileOutput: decodeBase64(data.compile_output),
    message: decodeBase64(data.message),
    time: data.time ?? null,
    memory: data.memory ?? null,
  };
}

export async function runSubmission({ sourceCode, language, stdin }) {
  const token = await createSubmission({ sourceCode, language, stdin });
  const startedAt = Date.now();

  while (true) {
    const submission = await getSubmission(token);

    if (submission.statusId !== null && submission.statusId >= 3) {
      return submission;
    }

    if (Date.now() - startedAt >= MAX_POLL_TIME_MS) {
      throw new Judge0TimeoutError("Judge0 submission did not finish within the allotted time");
    }

    await sleep(POLL_INTERVAL_MS);
  }
}
