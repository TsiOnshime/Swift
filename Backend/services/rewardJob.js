import Rental from "../models/rental.model.js";
import User from "../models/user.model.js";
import { rewardUser } from "./reward.service.js";

export async function rewardFinishedPackages() {
  // Find rentals that have ended and not yet rewarded
  const now = new Date();
  const finished = await Rental.find({
    endTime: { $lte: now },
    rewarded: { $ne: true },
  }).populate("user");

  for (const rental of finished) {
    try {
      // Reward logic: 2 tokens for 30 min

      const walletAddress = rental.walletAddress;
      if (walletAddress) {
        await rewardUser(walletAddress, 2 * 10 ** 9); // 2 tokens, decimals=9
        rental.rewarded = true;
        await rental.save();
        console.log(`Rewarded ${walletAddress} for rental ${rental._id}`);
      } else {
        console.error(`No wallet address for rental ${rental._id}`);
      }
    } catch (err) {
      console.error("Reward error:", err);
    }
  }
}
