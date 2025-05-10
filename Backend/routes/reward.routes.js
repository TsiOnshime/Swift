import express from "express";
import { rewardUser, transferTokens } from "../services/reward.service.js";

const router = express.Router();

router.post("/reward", async (req, res) => {
  const { userPubkey, amount } = req.body;
  try {
    await rewardUser(userPubkey, amount);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// New endpoint for sending tokens to a friend
router.post("/transfer", async (req, res) => {
  const { fromPubkey, toPubkey, amount } = req.body;
  try {
    await transferTokens(fromPubkey, toPubkey, amount);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;