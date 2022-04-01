import { useFormContext } from "react-hook-form";
import { ThemeType } from "../../../../../global/theme";
import Input from "../../../../containers/input";
import { IManage, IManageUser } from "../ManageUser.types";

interface IInputbox extends IManage, ThemeType {}

export const Inputbox = ({ isDark }: IInputbox) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IManageUser>();

  return (
    <div>
      <Input
        register={register("commonCodeSeq", {
          required: "아티스트의 장르 코드를 작성해주세요",
          // validate: {
          //   positive: (v: number) => v > 0 || "장르 코드는 숫자여야 합니다.",
          // },
        })}
        isDark={isDark}
        errMessage={errors.commonCodeSeq?.message}
        type="text"
        placeholder="아티스트의 장르 코드"
      />
      <Input
        register={register("artistDescription", {
          required: "아티스트의 소개글을 작성해주세요",
          minLength: {
            value: 20,
            message: "너무 짧으면 팬들에게 어필하기 힘들지도 몰라요 😭",
          },
        })}
        isDark={isDark}
        errMessage={errors.artistDescription?.message}
        type="text"
        placeholder="아티스트 소개글"
      />
      <Input
        register={register("artistSns", {
          required: "아티스트의 SNS 주소를 작성해주세요",
        })}
        isDark={isDark}
        errMessage={errors.artistSns?.message}
        type="text"
        placeholder="아티스트 SNS 주소"
      />
    </div>
  );
};
