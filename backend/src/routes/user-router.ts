// import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";
import userService from "@services/user-service";

import { getConnection } from "typeorm";
import { maxHeaderSize } from "http";
import { Cipher } from "crypto";
const router = Router();

// user info 불러오기
// GET : http://localhost:8080/api/user/info?userSeq=4
router.get("/info", async (req: Request, res: Response) => {
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

// 닉네임 중복 확인
router.get("/check/nickname", async (req: Request, res: Response) => {
  const inputNickname = String(req.query.userNickname);
  console.log("inputNickname -> ", inputNickname);
  try {
    const savedNickName = await userService.checkNickname(inputNickname);
    console.log("log", savedNickName);
    if (!savedNickName) {
      res.status(200).json({ result: "사용 가능한 닉네임입니다." });
    } else {
      res.status(404).json({ error: "존재하는 닉네임입니다." });
    }
  } catch (err) {
    console.error("error is", err);
    res.status(500).json({ error: err });
  }
});

// 로그인 및 회원가입
router.post("/join", async (req, res, next) => {
  const userWalletAddress = req.body.userWalletAddress;
  console.log("userWalletAddress=>", userWalletAddress);
  try {
    const exUser = await userService.checkUser(userWalletAddress);

    // 로그인
    if (exUser) {
      return res.status(200).json({
        success: {
          userSeq: exUser.user_seq,
          userNickname: exUser.user_nickname,
          userProfileImage: exUser.user_profile_image,
          userWalletAddress: exUser.user_wallet_address,
          userRole: exUser.user_role,
        },
      });
    } else {
      const newUser = await userService.createUser(userWalletAddress);
      return res.status(200).json({ success: "join success" });
    }
  } catch (error) {
    return res.status(404).json({ fail: error });
  }
});

//회원탈퇴
router.put("/withdraw", async (req, res, next) => {
  const userSeq = req.body.userSeq;
  try {
    const exUser = await userService.getUserInfo(userSeq);
    console.log(userSeq);
    if (exUser) {
      userService.deleteUser(userSeq);
      return res.status(200).json({ success: "" });
    }
  } catch (error) {
    return res.status(404).json({ fail: error });
  }
});

export default router;
