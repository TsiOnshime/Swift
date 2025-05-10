import cron from "node-cron";
import { rewardFinishedPackages } from "./services/rewardJob.js";
import connectToDb from "./db/db.js";
import dotenv from "dotenv";
dotenv.config();

connectToDb();

// Run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  console.log("Running reward job...");
  await rewardFinishedPackages();
});