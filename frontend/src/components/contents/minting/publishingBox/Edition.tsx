import { useFormContext } from "react-hook-form";
import { ThemeType } from "../../../../global/theme";
import Input from "../../../containers/input";
import { IMinting } from "../Minting.types";

interface IEdition extends ThemeType {}

export const Edition = ({ isDark }: IEdition) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IMinting>();
  return (
    <Input
      register={register("editionTotal", {
        required: "발행할 에디션 수를 입력해주세요",
        min: {
          value: 0,
          message: "에디션 갯수는 0보다 커야합니다",
        },
        validate: {
          shouldInt: (v: number) => v % 1 === 0 || "자연수만 올 수 있어요",
        },
      })}
      type="text"
      placeholder="제한된 개수의 에디션으로 팬들을 더 뿌듯하게 만드세요"
      label="Number of Edition"
      isDark={isDark}
      errMessage={errors.editionTotal?.message}
    />
  );
};
