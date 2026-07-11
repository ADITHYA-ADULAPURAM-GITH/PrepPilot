import "dotenv/config";

const REQUIRED_VARS = [
  "MONGO_URI",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "CLIENT_URL",
];

for (const key of REQUIRED_VARS) {
  if (!process.env[key]) {
    // Fail fast at boot rather than surfacing a confusing error deep in a request.
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  CLIENT_URL: process.env.CLIENT_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || "15m",
  JWT_REFRESH_EXPIRY_SHORT: process.env.JWT_REFRESH_EXPIRY_SHORT || "1d",
  JWT_REFRESH_EXPIRY_LONG: process.env.JWT_REFRESH_EXPIRY_LONG || "30d",
};
