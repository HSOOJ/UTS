import { User } from "@models/user-model";
import { createQueryBuilder, Equal, getConnection } from "typeorm";
import { json, Request, Response } from "express";
import { stringify } from "querystring";
import { Follow } from "@models/follow-model";

function getUserInfo(userSeq: number) {
  const userRepository = getConnection().getRepository(User);
  return userRepository.findOne({
    where: {
      user_seq: userSeq,
    },
  });
}

function checkNickname(inputNickname: string) {
  const userRepository = getConnection().getRepository(User);
  return userRepository.count({
    where: {
      user_nickname: Equal(inputNickname),
    },
  });
}

function checkUser(userWalletAddress: string) {
  const userRepository = getConnection().getRepository(User);
  return userRepository.findOne({
    where: {
      user_wallet_address: userWalletAddress,
    },
  });
}

function checkUserSeq(userSeq: number) {
  const userRepository = getConnection().getRepository(User);
  return userRepository.findOne({
    where: {
      user_seq: userSeq,
    },
  });
}

async function checkArtistYn(userSeq: number) {
  const userRepository = getConnection().getRepository(User);
  const userRole = await userRepository.findOne({
    where: {
      user_seq: userSeq,
    },
  });
  return userRole;
}

async function getMaxUserSeq() {
  const userRepository = getConnection().getRepository(User);
  const latestUserSeq = userRepository
    .createQueryBuilder()
    .select("MAX(user.user_seq)", "max");
  return await latestUserSeq.getRawOne();
}

async function createUser(userWalletAddress: string) {
  const userRepository = getConnection().getRepository(User);

  const latestUserSeq = await getMaxUserSeq();

  const nowDate = new Date();
  const newUser = userRepository.insert({
    user_wallet_address: userWalletAddress,
    user_nickname: "user" + (latestUserSeq["max"] + 1),
    user_profile_image: "defaultimageurl",
    reg_dt: nowDate,
    mod_dt: nowDate,
  });
  return newUser;
}

async function deleteUser(userSeq: number) {
  const userRepository = getConnection().getRepository(User);
  const nowDate = new Date();
  // console.log("here", userSeq);
  try {
    await userRepository.update(
      {
        user_seq: userSeq,
      },
      {
        mod_dt: nowDate,
        del_dt: nowDate,
      }
    );
  } catch (error) {}
}

function editNickname(userSeq: number, newNickname: string) {
  console.log("PROCEEDING edit nickname... ");
  const userRepository = getConnection().getRepository(User);
  const nowDate = new Date();
  try {
    userRepository.update(
      {
        user_seq: userSeq,
      },
      {
        user_nickname: newNickname,
        mod_dt: nowDate,
      }
    );
  } catch (error) {}
}

function editProfileImage(userSeq: number, newProfileImage: string) {
  console.log("PROCEEDING edit profile image... ");
  const userRepository = getConnection().getRepository(User);
  const nowDate = new Date();
  try {
    userRepository.update(
      {
        user_seq: userSeq,
      },
      {
        user_profile_image: newProfileImage,
        mod_dt: nowDate,
      }
    );
  } catch (error) {}
}

async function getUserProfileImage(userSeq: number) {
  const userInfo = await getConnection()
    .createQueryBuilder()
    .select("user.user_profile_image")
    .from(User, "user")
    .where("user.user_seq = :seq", { seq: userSeq })
    .getOne();
  const res = (<{ user_profile_image: string }>userInfo).user_profile_image;
  return res;
}

async function getFollowings(myUserSeq: number, profileUserSeq: number) {
  const followRepository = getConnection().getRepository(Follow);
  const followList = await followRepository
    .createQueryBuilder("follow")
    .leftJoinAndSelect(User, "user", "user.user_seq = follow.user_to")
    .where({ user_from: profileUserSeq })
    .getRawMany();

  return followList;
}
/*
SELECT *
FROM User user
WHERE user.user_seq = userSeq
*/
// function getUserInfo(userSeq: number) {
//   const userInfo = getConnection()
//     .createQueryBuilder()
//     .select(["user"])
//     .from(User, "user")
//     .where("user.user_seq = :seq", { seq: userSeq })
//     .getOne();
//   return userInfo;
// }

// Export default
export default {
  getUserProfileImage,
  editProfileImage,
  editNickname,
  getUserInfo,
  checkUser,
  checkUserSeq,
  createUser,
  deleteUser,
  checkNickname,
  checkArtistYn,
  getFollowings,
} as const;
