// import StatusCodes from "http-status-codes";
// import { User } from "@models/user-model";
import { Request, Response, Router } from "express";
import userService from "@services/user-service";

const router = Router();

// GET : http://localhost:8080/api/user/info/?userSeq=4
router.get("/info/", async (req: Request, res: Response) => {
  const userSeq = Number(req.query.userSeq);
  console.log("userSeq -> ", userSeq);
  try {
    const userInfo = await userService.getUserInfo(userSeq);

    if (!userInfo) {
      res.status(404).json({ error: "user가 존재하지 않습니다." });
    } else {
      const userNickname = userInfo.user_nickname;
      const userProfileImage = userInfo.user_profile_image;

      res.status(200).json({
        userNickname: userNickname,
        userProfileImage: userProfileImage,
      });
    }
  } catch (err) {
    console.error("error is", err);
    res.status(500).json({ error: err });
  }
});

export default router;

// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// /* eslint-disable @typescript-eslint/no-misused-promises */
// import StatusCodes from "http-status-codes";
// import { Request, Response, Router } from "express";

// // import userService from "@services/user-service";
// import { ParamMissingError } from "@shared/errors";

// // Constants
// const router = Router();
// const { CREATED, OK } = StatusCodes;

// // Paths
// export const p = {
//   get: "/all",
//   add: "/add",
//   update: "/update",
//   delete: "/delete/:id",
// } as const;

// /**
//  * Get all users.
//  */
// router.get(p.get, async (_: Request, res: Response) => {
//   const users = await userService.getAll();
//   return res.status(OK).json({ users });
// });

// /**
//  * Add one user.
//  */
// router.post(p.add, async (req: Request, res: Response) => {
//   const { user } = req.body;
//   // Check param
//   if (!user) {
//     throw new ParamMissingError();
//   }
//   // Fetch data
//   await userService.addOne(user);
//   return res.status(CREATED).end();
// });

// /**
//  * Update one user.
//  */
// router.put(p.update, async (req: Request, res: Response) => {
//   const { user } = req.body;
//   // Check param
//   if (!user) {
//     throw new ParamMissingError();
//   }
//   // Fetch data
//   await userService.updateOne(user);
//   return res.status(OK).end();
// });

// /**
//  * Delete one user.
//  */
// router.delete(p.delete, async (req: Request, res: Response) => {
//   const { id } = req.params;
//   // Check param
//   if (!id) {
//     throw new ParamMissingError();
//   }
//   // Fetch data
//   await userService.delete(Number(id));
//   return res.status(OK).end();
// });

// // Export default
// export default router;
