import { User } from "@models/user-model";
import { Equal, getConnection } from "typeorm";
import { Request, Response } from "express";

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
  editNickname,
  getUserInfo,
  checkUser,
  createUser,
  deleteUser,
  checkNickname,
} as const;
