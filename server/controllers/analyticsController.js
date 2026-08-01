import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { analyticsService } from "../services/analyticsService.js";

export const getOverview = asyncHandler(async (req, res) => {
  const overview = await analyticsService.getOverview(req.user._id);
  res.status(200).json(new ApiResponse(200, overview, "OK"));
});