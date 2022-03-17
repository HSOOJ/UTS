import { Router, Request, Response } from "express";
import middleware from "../middleware";
const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route.get(
    "/info",
    middleware.isAuth,
    middleware.attachCurrentUser,
    (req: Request, res: Response) => {
      return res.json({ user: req.currentUser }).status(200);
    }
  );
};
