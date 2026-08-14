import axiosInstance from "@/api/axiosInstance";

export const mentorApi = {
  getConversation: () => axiosInstance.get("/mentor/conversation"),
  sendMessage: (message) => axiosInstance.post("/mentor/chat", { message }),
   updateIdentity: (payload) => axiosInstance.patch("/mentor/identity", payload),
};