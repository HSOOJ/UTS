import { Follow } from "@models/follow-model";
import { User } from "@models/user-model";
import { start } from "repl";
import { getConnection } from "typeorm";
import userService from "@services/user-service";
import { json } from "stream/consumers";

async function artistCheckFollow(userTo: number, userFrom: number) {
  const followRepository = getConnection().getRepository(Follow);

  return followRepository.findOne({
    where: {
      user_to: userTo,
      user_from: userFrom,
    },
  });
}

async function artistFollow(userTo: number, userFrom: number) {
  const followRepository = getConnection().getRepository(Follow);
  const check_f = await userService.checkArtistYn(userTo);
  const nowDate = new Date();
  try {
    const check_1 = await userService.checkUserSeq(userTo);
    const check_2 = await userService.checkUserSeq(userFrom);

    if (check_1 && check_2 && check_f?.user_role == 1) {
      await followRepository.insert({
        user_to: userTo,
        user_from: userFrom,
        reg_dt: nowDate,
        mod_dt: nowDate,
      });
      console.log("등록 완료");
      return 1;
    }
    console.log("등록 실패, 유저 없음 혹은 아티스트 아님");
    return 0;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function artistUnFollow(userTo: number, userFrom: number) {
  const followRepository = getConnection().getRepository(Follow);

  try {
    const check_1 = await userService.checkUserSeq(userTo);
    const check_2 = await userService.checkUserSeq(userFrom);
    const check_f = await artistCheckFollow(userTo, userFrom);
    if (check_1 && check_2 && check_f) {
      await followRepository
        .createQueryBuilder()
        .softDelete()
        .where({
          user_to: userTo,
          user_from: userFrom,
        })
        .execute();
      console.log("언팔로우 완료");
      return;
    }
    console.log("유저 없음");
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default {
  artistCheckFollow,
  artistFollow,
  artistUnFollow,
} as const;
