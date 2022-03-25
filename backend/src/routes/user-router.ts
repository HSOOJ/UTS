// import StatusCodes from "http-status-codes";
// import { User } from "@models/user-model";
import { Request, Response, Router } from "express";
import userService from "@services/user-service";
import { User } from "@models/user-model";

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
        userSeq: exUser.user_seq,
        userNickname: exUser.user_nickname,
        userProfileImage: exUser.user_profile_image,
        userWalletAddress: exUser.user_wallet_address,
        userRole: exUser.user_role,
      });
    } else {
      const newUser = await userService.createUser(userWalletAddress);
      return res.status(200).json("join success");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});

router.put("/withdraw", async (req, res, next) => {
  const userSeq = req.body.userSeq;
  console.log("userSeq=>", userSeq);
  try {
    const exUser = await userService.getUserInfo(userSeq);
    console.log(userSeq);
    if (exUser) {
      // 회원탈퇴 함수
      userService.deleteUser(userSeq);
      return res.status(200);
    }
  } catch (error) {
    console.error(error);
    res.status(404);
    return;
  }
});

router.put("/edit/nickname", async (req, res, next) => {
  console.log("start edit nickname... ");
  const userSeq = req.body.userSeq;
  const newNickname = req.body.userNickname;
  // console.log("userSeq: ", userSeq, "| input nickname: ", newNickname);
  try {
    const savedNickName = await userService.checkNickname(newNickname);
    if (savedNickName) {
      res.status(404).json({ error: "존재하는 닉네임입니다." });
      return;
    } else {
      userService.editNickname(userSeq, newNickname);
      return res.status(200).json("닉네임 변경 성공");
    }
  } catch (error) {
    return;
  }
});

export default router;
