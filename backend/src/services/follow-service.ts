import { Follow } from "@models/follow-model";
import { User } from "@models/user-model";
import { start } from "repl";
import { getConnection } from "typeorm";

async function artistFollow(from: number, myto: number) {
  const followRepository = getConnection().getRepository(Follow);
  const userRepository = getConnection().getRepository(User);
  // console.log("here", from, to);
  return userRepository.findOne({
    where: {
      user_seq: 12,
    },
  });
}

export default {
  artistFollow,
} as const;
