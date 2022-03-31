import { Router } from "express";
import userRouter from "./user-router";
import artistRouter from "./artist-router";
import marketRouter from "./market-router";
import searchRouter from "./search-router";
import followRouter from "./follow-router";
import heartRouter from "./heart-router";
import saleRouter from "./sale-router";
import nftRouter from "./nft-router";
import mainRouter from "./main-router";
import editionRouter from "./edition-router";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use("/user", userRouter);
baseRouter.use("/artist", artistRouter);
baseRouter.use("/market", marketRouter);
baseRouter.use("/search", searchRouter);
baseRouter.use("/artist", followRouter);
baseRouter.use("/nft", searchRouter);
baseRouter.use("/nft", heartRouter);
baseRouter.use("/nft", saleRouter);
baseRouter.use("/nft", nftRouter);
baseRouter.use("/main", mainRouter);
baseRouter.use("/edition", editionRouter);

// Export default.
export default baseRouter;
