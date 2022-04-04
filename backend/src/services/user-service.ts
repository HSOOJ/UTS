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
    user_profile_image:
      "https://cdn.pixabay.com/photo/2022/03/18/19/09/blue-throat-7077261_960_720.jpg",
    user_volume: 0,
    reg_dt: nowDate,
    mod_dt: nowDate,
  });

  return (await newUser).raw.insertId;
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

async function getAllUserProfileImage(userSeq: number) {
  const userInfo = await getConnection()
    .createQueryBuilder()
    .select("user.user_profile_image")
    .from(User, "user")
    .where("user.user_seq = :seq", { seq: userSeq })
    .withDeleted()
    .getOne();
  if (userInfo !== null) {
    const res = (<{ user_profile_image: string }>userInfo).user_profile_image;
    return res;
  } else {
    return null;
  }
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

// Export default
export default {
  getUserProfileImage,
  getAllUserProfileImage,
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
