import { Router } from "express";
import userRouter from "./user-router";
import marketRouter from "./market-router";
import followRouter from "./follow-router";
import nftRouter from "./nft-router";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use("/user", userRouter);
baseRouter.use("/market", marketRouter);
baseRouter.use("/artist", followRouter);
baseRouter.use("/nft", nftRouter);

// Export default.
export default baseRouter;
