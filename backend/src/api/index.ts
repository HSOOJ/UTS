import { Router } from "express";
import user from "./controller/user";

// guaranteed to get dependencies
export default () => {
  const app = Router();
  user(app);

  return app;
};
