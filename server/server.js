import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";

async function start() {
  await connectDB();

  const server = app.listen(env.PORT, () => {
    console.log(`PrepPilot API running on port ${env.PORT} [${env.NODE_ENV}]`);
  });

  process.on("unhandledRejection", (err) => {
    console.error("Unhandled rejection:", err);
    server.close(() => process.exit(1));
  });
}

start();
