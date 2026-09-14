import { ProblemBank } from "../models/ProblemBank.js";
import { TestCase } from "../models/TestCase.js";
import { runSubmission, Judge0TimeoutError, Judge0UnavailableError } from "./judge0Client.js";

const RESULT_PRIORITY = ["CompilationError", "RuntimeError", "TimeLimitExceeded", "WrongAnswer"];

function buildHarness(language, userCode, entryPoint) {
  if (language === "javascript") {
    return [
      userCode,
      "const __args = JSON.parse(require('fs').readFileSync(0, 'utf8'));",
      `console.log(JSON.stringify(${entryPoint}(...__args)));`,
    ].join("\n");
  }

  if (language === "python") {
    return [
      userCode,
      "import sys, json",
      "__args = json.loads(sys.stdin.read())",
      `print(json.dumps(${entryPoint}(*__args)))`,
    ].join("\n");
  }

  throw new Error(`Unsupported language: ${language}`);
}

function mapStatusToResult(statusId, jsonMatch) {
  if (statusId === 3) return jsonMatch ? "Accepted" : "WrongAnswer";
  if (statusId === 4) return "WrongAnswer";
  if (statusId === 5) return "TimeLimitExceeded";
  if (statusId === 6) return "CompilationError";
  if (statusId >= 7 && statusId <= 14) return "RuntimeError";
  return "RuntimeError";
}

function normalizedJsonEquals(actual, expected) {
  try {
    return JSON.stringify(JSON.parse(actual)) === JSON.stringify(JSON.parse(expected));
  } catch {
    return false;
  }
}

async function evaluateTestCase({ language, harness, testCase }) {
  const submission = await runSubmission({
    sourceCode: harness,
    language,
    stdin: testCase.input,
  });

  const passed =
    submission.statusId === 3 && normalizedJsonEquals(submission.stdout ?? "", testCase.expectedOutput);

  const timeMs = submission.time !== null ? Math.round(parseFloat(submission.time) * 1000) : null;

  return {
    order: testCase.order,
    isHidden: testCase.isHidden,
    passed,
    input: testCase.input,
    expectedOutput: testCase.expectedOutput,
    actualOutput: submission.stdout,
    result: mapStatusToResult(submission.statusId, passed),
    timeMs,
    memoryKb: submission.memory,
  };
}

async function evaluate({ problemId, language, code, includeHidden }) {
  const problem = await ProblemBank.findById(problemId);
  if (!problem) {
    throw new Error("Problem not found");
  }

  const entryPoint = problem.entryPoint?.[language];
  if (!entryPoint) {
    throw new Error(`No entryPoint configured for language: ${language}`);
  }

  const filter = includeHidden ? { problem: problemId } : { problem: problemId, isHidden: false };
  const testCases = await TestCase.find(filter).sort({ order: 1 });
  const totalCount = testCases.length;

  const harness = buildHarness(language, code, entryPoint);

  const evaluations = [];
  for (const testCase of testCases) {
    const evaluation = await evaluateTestCase({ language, harness, testCase });
    evaluations.push(evaluation);
    if (evaluation.result === "CompilationError") {
      break;
    }
  }

  const passedCount = evaluations.filter((e) => e.passed).length;

  let overallResult = "Accepted";
  for (const priorityResult of RESULT_PRIORITY) {
    if (evaluations.some((e) => !e.passed && e.result === priorityResult)) {
      overallResult = priorityResult;
      break;
    }
  }
  if (overallResult === "Accepted" && passedCount < totalCount) {
    overallResult = "WrongAnswer";
  }

  const runtimeMs = evaluations.reduce(
    (max, e) => (e.timeMs !== null && (max === null || e.timeMs > max) ? e.timeMs : max),
    null
  );
  const memoryKb = evaluations.reduce(
    (max, e) => (e.memoryKb !== null && (max === null || e.memoryKb > max) ? e.memoryKb : max),
    null
  );

  return { evaluations, passedCount, totalCount, overallResult, runtimeMs, memoryKb };
}

export async function runVisible({ problemId, language, code }) {
  const { evaluations, passedCount, totalCount, overallResult, runtimeMs, memoryKb } = await evaluate({
    problemId,
    language,
    code,
    includeHidden: false,
  });

  return {
    overallResult,
    passedCount,
    totalCount,
    runtimeMs,
    memoryKb,
    results: evaluations.map((e) => ({
      order: e.order,
      passed: e.passed,
      input: e.input,
      expectedOutput: e.expectedOutput,
      actualOutput: e.actualOutput,
      result: e.result,
    })),
  };
}

export async function runAll({ problemId, language, code }) {
  const { evaluations, passedCount, totalCount, overallResult, runtimeMs, memoryKb } = await evaluate({
    problemId,
    language,
    code,
    includeHidden: true,
  });

  const visibleFailures = evaluations
    .filter((e) => !e.isHidden && !e.passed)
    .map((e) => ({
      order: e.order,
      input: e.input,
      expectedOutput: e.expectedOutput,
      actualOutput: e.actualOutput,
      result: e.result,
    }));

  return {
    overallResult,
    passedCount,
    totalCount,
    runtimeMs,
    memoryKb,
    visibleFailures,
  };
}

export { Judge0TimeoutError, Judge0UnavailableError };
