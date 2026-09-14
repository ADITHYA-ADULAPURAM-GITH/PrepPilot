import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { notificationService } from "../services/notificationService.js";

export const listNotifications = asyncHandler(async (req, res) => {
  const notifications = await notificationService.list(req.user._id, req.query);
  res.status(200).json(new ApiResponse(200, { notifications }, "OK"));
});

export const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await notificationService.getUnreadCount(req.user._id);
  res.status(200).json(new ApiResponse(200, { count }, "OK"));
});

export const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await notificationService.markAsRead(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, { notification }, "Notification marked as read"));
});

export const markAllNotificationsRead = asyncHandler(async (req, res) => {
  await notificationService.markAllAsRead(req.user._id);
  res.status(200).json(new ApiResponse(200, null, "All notifications marked as read"));
});