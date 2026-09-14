import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { problemBankService } from "../services/problemBankService.js";
import { selectAndAssign } from "../services/problemSelectionService.js";

export const listProblemBank = asyncHandler(async (req, res) => {
  const { problems, pagination } = await problemBankService.list(req.query);
  res.status(200).json(new ApiResponse(200, { problems, pagination }, "OK"));
});

export const getProblemBankById = asyncHandler(async (req, res) => {
  const problem = await problemBankService.getById(req.params.id);
  res.status(200).json(new ApiResponse(200, { problem }, "OK"));
});

export const selectProblems = asyncHandler(async (req, res) => {
  const { assigned } = await selectAndAssign(req.user._id, req.body);
  res.status(200).json(new ApiResponse(200, { assigned }, "Problems selected"));
});