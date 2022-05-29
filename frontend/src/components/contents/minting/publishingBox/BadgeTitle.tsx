import { useFormContext } from "react-hook-form";
import { ThemeType } from "../../../../global/theme";
import { IForm } from "../../../../types/IForm";
import Input from "../../../containers/input";
import { IMinting } from "../Minting.types";

interface IBadgeTitle extends ThemeType, IForm {}

export const BadgeTitle = ({ isDark }: IBadgeTitle) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IMinting>();
  return (
    <Input
      type="text"
      placeholder="뱃지 이름을 입력"
      label="Badge Name"
      isDark={isDark}
      register={register("editionName", {
        required: "뱃지 이름을 입력해주세요",
        minLength: {
          value: 5,
          message: "너무 짧아요 😭",
        },
      })}
      errMessage={errors.editionName?.message}
    />
  );
};
