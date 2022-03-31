import { Artist } from "@models/Artist";
import { Common_code } from "@models/common_code-model";
import { User } from "@models/user-model";
import { getConnection } from "typeorm";
import userService from "./user-service";

async function searchUser(userWalletAddress: string) {
  const artistRepository = getConnection().getRepository(Artist);
  const result = await artistRepository
    .createQueryBuilder("artist")
    .leftJoinAndSelect("artist.code_seq2", "common_code")
    .leftJoinAndSelect(User, "user", "user.user_seq = artist.user_seq")
    .where("user.user_wallet_address = :userWalletAddress", {
      userWalletAddress: userWalletAddress,
    })
    .getRawOne();
  if (result) {
    return {
      userSeq: result.artist_user_seq,
      userNickname: result.user_user_nickname,
      userRole: result.user_user_role,
      commonCodeSeq: result.common_code_code_seq,
      commonCode: result.common_code_code,
    };
  } else {
    const userInfo = await userService.checkUser(userWalletAddress);
    return {
      userSeq: userInfo?.user_seq,
      userNickname: userInfo?.user_nickname,
      userRole: userInfo?.user_role,
    };
  }
}

export default { searchUser } as const;
