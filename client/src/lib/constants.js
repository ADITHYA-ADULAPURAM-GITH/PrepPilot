//constants.js

export const APP_NAME = "PrepPilot";

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  DSA_TRACKER: "/dsa-tracker",
  CS_SUBJECTS: "/cs-subjects",
  COMPANIES: "/companies",
  COMPANY_DETAILS: "/companies/:companyId",
  RESUME: "/resume",
  STUDY_PLANNER: "/study-planner",
  MOCK_TESTS: "/mock-tests",
  MOCK_TEST_DETAILS: "/mock-tests/:testId",
  MOCK_TEST_ATTEMPT: "/mock-tests/attempt/:attemptId",
  MOCK_TEST_RESULT: "/mock-tests/result/:attemptId",
};

export const AUTH_TOKEN_KEY = "preppilot_access_token";