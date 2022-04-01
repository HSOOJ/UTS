import { useFormContext } from "react-hook-form";
import { ThemeType } from "../../../../../../../global/theme";
import Input from "../../../../../../containers/input";
import { IManage, IManageUser } from "../../../ManageUser.types";

interface IInputAddress extends IManage, ThemeType {}

export const InputAddress = ({ isDark }: IInputAddress) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IManageUser>();

  return (
    <>
      <Input
        register={register("userWalletAddress", {
          required: "회원님의 지갑 주소를 작성해주세요",
        })}
        type="text"
        placeholder="회원님의 지갑 주소를 입력해주세요"
        isDark={isDark}
      ></Input>
    </>
  );
};
