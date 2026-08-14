import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse, ApiError } from "../utils/apiResponse.js";
import { mentorService } from "../services/mentorService.js";

export const getConversation = asyncHandler(async (req, res) => {
  const messages = await mentorService.getConversation(req.user._id);
  res.status(200).json(new ApiResponse(200, { messages }, "OK"));
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    throw new ApiError(400, "Message is required");
  }
  if (message.length > 2000) {
    throw new ApiError(400, "Message is too long");
  }

  const result = await mentorService.sendMessage(req.user._id, message.trim(), req.user.mentor?.name);
  res.status(200).json(new ApiResponse(200, result, "OK"));
});

export const updateIdentity = asyncHandler(async (req, res) => {
  const { name, avatar } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    throw new ApiError(400, "Mentor name is required");
  }
  if (name.trim().length > 40) {
    throw new ApiError(400, "Mentor name is too long");
  }
  if (avatar !== "male" && avatar !== "female") {
    throw new ApiError(400, "Avatar must be 'male' or 'female'");
  }

  const user = await mentorService.updateIdentity(req.user._id, { name: name.trim(), avatar });
  res.status(200).json(new ApiResponse(200, { user }, "Mentor identity updated"));
});