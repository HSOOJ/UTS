import { Router } from "express";
import userRouter from "./user-router";
import marketRouter from "./market-router";
import searchRouter from "./search-router";
import followRouter from "./follow-router";
import heartRouter from "./heart-router";
import saleRouter from "./sale-router";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use("/user", userRouter);
baseRouter.use("/market", marketRouter);
baseRouter.use("/search", searchRouter);
baseRouter.use("/artist", followRouter);
baseRouter.use("/nft", heartRouter);
baseRouter.use("/nft", saleRouter);
// Export default.
export default baseRouter;
