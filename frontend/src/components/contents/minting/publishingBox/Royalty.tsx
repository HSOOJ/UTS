import { useFormContext } from "react-hook-form";
import { ThemeType } from "../../../../global/theme";
import Input from "../../../containers/input";
import { IMinting } from "../Minting.types";

interface IRoyalty extends ThemeType {}

export const Royalty = ({ isDark }: IRoyalty) => {
  const { register, formState } = useFormContext<IMinting>();
  return (
    <Input
      register={register("editionRoyalty", {
        required: "로열티를 입력해주세요",
        min: {
          value: 0,
          message: "로열티는 0~50%까지 입력할 수 있어요",
        },
        max: {
          value: 50,
          message: "로열티는 0~50%까지 입력할 수 있어요",
        },
      })}
      type="text"
      placeholder="뱃지가 거래될때마다 로열티를 받을 수 있어요"
      label="Royalties"
      isDark={isDark}
      errMessage={formState.errors.editionRoyalty?.message}
    />
  );
};
