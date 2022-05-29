import { useFormContext } from "react-hook-form";
import { ThemeType } from "../../../../global/theme";
import { IForm } from "../../../../types/IForm";
import TextArea from "../../../containers/textArea";
import { IMinting } from "../Minting.types";

interface IDescription extends IForm, ThemeType {}

export const Description = ({ isDark }: IDescription) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IMinting>();
  return (
    <TextArea
      register={register("editionDescription", {
        required: "팬들에게 어필할 혜택을 입력해주세요",
        minLength: {
          value: 50,
          message: "너무 짧으면 팬들에게 어필하기 힘들지도 몰라요 😭",
        },
      })}
      errMessage={errors.editionDescription?.message}
      type="text"
      label="Description"
      isDark={isDark}
      placeholder="오직 아티스트님만이 제공할 수 있는 혜택으로 팬들에게 어필해 보세요"
    />
  );
};
