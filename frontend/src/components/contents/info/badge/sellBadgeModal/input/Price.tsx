import { useFormContext } from "react-hook-form";
import { ThemeType } from "../../../../../../global/theme";
import { IForm } from "../../../../../../types/IForm";
import Input from "../../../../../containers/input";
import { ISellBadge } from "../SellBadgeModal.types";

interface IPrice extends IForm, ThemeType {}

export const Price = ({ isDark }: IPrice) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ISellBadge>();

  return (
    <Input
      register={register("salePrice", {
        required: "뱃지 가격을 입력해주세요",
        validate: {
          positive: (v: number) => v > 0 || "가격은 숫자여야 합니다.",
        },
      })}
      errMessage={errors.salePrice?.message}
      type="text"
      placeholder="가격"
      isDark={isDark}
    />
  );
};
