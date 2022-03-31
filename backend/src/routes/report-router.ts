import { Router } from "express";
import reportService from "@services/report-service";
const router = Router();

router.get("/search/user", async (req, res, next) => {
  const userWalletAddress = String(req.query.userWalletAddress);
  const result = await reportService.searchUser(userWalletAddress);
  return res.status(200).json({
    success: result,
  });
});

export default router;
