import { Artist } from "@models/Artist";
import { Common_code } from "@models/common_code-model";
import { Report } from "@models/report-model";
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
      artistSeq: result.artist_artist_seq,
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
async function acceptArtist(
  userSeq: number,
  commonCodeSeq: number,
  artistDescription: string,
  artistSns: string
) {
  try {
    const nowDate = new Date();
    const userRepository = getConnection().getRepository(User);
    const artistRepository = getConnection().getRepository(Artist);

    await userRepository.update(
      { user_seq: userSeq },
      {
        user_role: 1,
      }
    );
    await artistRepository.insert({
      user_seq: userSeq,
      code_seq: commonCodeSeq,
      artist_description: artistDescription,
      artist_sns: artistSns,
      reg_dt: nowDate,
      mod_dt: nowDate,
    });
    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
}
async function unacceptArtist(userSeq: number, artistSeq: number) {
  try {
    const userRepository = getConnection().getRepository(User);
    const artistRepository = getConnection().getRepository(Artist);

    await userRepository.update(
      { user_seq: userSeq },
      {
        user_role: 0,
      }
    );

    await artistRepository
      .createQueryBuilder()
      .softDelete()
      .where({
        artist_seq: artistSeq,
      })
      .execute();
  } catch (error) {
    console.log(error);
    return 0;
  }
}

async function getReport() {
  const reportRepository = getConnection().getRepository(Report);
  const result = reportRepository
    .createQueryBuilder()
    .leftJoinAndSelect(Artist, "artist", "artist.user_seq = report.artist_seq")
    .leftJoinAndSelect(User, "user", "artist.user_seq = user.user_seq")
    .select("user.user_seq as userSeq")
    .addSelect("report.artist_seq AS artistSeq")
    .addSelect("user.user_nickname AS userNickname")
    .addSelect("report.user_seq AS reporterSeq")
    .getRawMany();
  return result;
}
export default { searchUser, acceptArtist, unacceptArtist, getReport } as const;
