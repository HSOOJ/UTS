import { User } from "@models/user-model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class userRepository extends Repository<User> {
  getOneUser(userSeq: number): Promise<User | null> {
    const user = this.createQueryBuilder()
      .select(["user.user_nickname", "user_wallet_address"])
      .from(User, "user")
      .where("user.user_seq = :seq", { seq: userSeq })
      .getOne();
    return user;
  }
}
