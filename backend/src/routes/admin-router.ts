import { Router } from "express";
import adminService from "@services/admin-service";
const router = Router();

router.get("/search/user", async (req, res, next) => {
  const userWalletAddress = String(req.query.userWalletAddress);
  const result = await adminService.searchUser(userWalletAddress);
  return res.status(200).json({
    success: result,
  });
});

router.post("/artist/accept", async (req, res, next) => {
  const { userSeq, commonCodeSeq, artistDescription, artistSns } = req.body;
  const result = await adminService.acceptArtist(
    userSeq,
    commonCodeSeq,
    artistDescription,
    artistSns
  );
  if (result) {
    return res.status(200).json({ success: "" });
  } else {
    return res.status(404).json({ fail: "" });
  }
});

router.put("/artist/cancel", async (req, res, next) => {
  const { userSeq, artistSeq } = req.body;
  const result = await adminService.unacceptArtist(userSeq, artistSeq);

  return res.status(200).json({ success: "" });
});

router.get("/report", async (req, res, next) => {
  const result = await adminService.getReport();
  return res.status(200).json({ success: result });
});
export default router;

router.put("/report/cancel", async (req, res, next) => {
  const reportSeq = await req.body.reportSeq;
  try {
    const result = await adminService.cancelReport(reportSeq);
  } catch (error) {
    return res.status(404).json({ fail: "" });
  }
  return res.status(200).json({ success: true });
});
