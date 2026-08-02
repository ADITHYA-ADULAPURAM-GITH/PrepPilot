import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { mockTestService } from "../services/mockTestService.js";

export const listMockTests = asyncHandler(async (req, res) => {
  const { tests, pagination } = await mockTestService.list(req.query);
  res.status(200).json(new ApiResponse(200, { tests, pagination }, "OK"));
});

export const getMockTest = asyncHandler(async (req, res) => {
  const test = await mockTestService.getById(req.params.id);
  res.status(200).json(new ApiResponse(200, { test }, "OK"));
});

export const startAttempt = asyncHandler(async (req, res) => {
  const attempt = await mockTestService.startAttempt(req.user._id, req.params.id);
  res.status(201).json(new ApiResponse(201, { attempt }, "Attempt started"));
});

export const getAttemptQuestions = asyncHandler(async (req, res) => {
  const { attempt, questions } = await mockTestService.getAttemptQuestions(req.user._id, req.params.attemptId);
  res.status(200).json(new ApiResponse(200, { attempt, questions }, "OK"));
});

export const saveAnswer = asyncHandler(async (req, res) => {
  const attempt = await mockTestService.saveAnswer(req.user._id, req.params.attemptId, req.body);
  res.status(200).json(new ApiResponse(200, { attempt }, "Answer saved"));
});

export const submitAttempt = asyncHandler(async (req, res) => {
  const attempt = await mockTestService.submitAttempt(req.user._id, req.params.attemptId, {
    autoSubmitted: req.body?.autoSubmitted === true,
  });
  res.status(200).json(new ApiResponse(200, { attempt }, "Attempt submitted"));
});

export const listUserAttempts = asyncHandler(async (req, res) => {
  const { attempts, pagination } = await mockTestService.listUserAttempts(req.user._id, req.query);
  res.status(200).json(new ApiResponse(200, { attempts, pagination }, "OK"));
});

export const getAttempt = asyncHandler(async (req, res) => {
  const attempt = await mockTestService.getAttemptById(req.user._id, req.params.attemptId);
  res.status(200).json(new ApiResponse(200, { attempt }, "OK"));
});