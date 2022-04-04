import { FieldError } from "react-hook-form";

export interface IManageUser {
  commonCodeSeq?: string;
  artistDescription?: string;
  artistSns?: string;
  userWalletAddress?: string;
}

export interface IManage extends IManageUser {}

export interface IManageErrors {
  commonCodeSeq?: FieldError | undefined;
  artistDescription?: FieldError | undefined;
  artistSns?: FieldError | undefined;
  userWalletAddress?: FieldError | undefined;
}
