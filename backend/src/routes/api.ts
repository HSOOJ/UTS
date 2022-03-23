import { Router } from "express";
// import userRouter from "./user-router";
import marketRouter from "./market-router";

// Export the base-router
const baseRouter = Router();

// Setup routers
// baseRouter.use("/users", userRouter);
baseRouter.use("/market", marketRouter);

// Export default.
export default baseRouter;
