import { Controller, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { onFileChange } from "../../../../hooks/minting";
import { themeAtom } from "../../../../recoil/theme";
import { SERVICE_FEE } from "../../../../types/IServiceFee";
import ImageInput from "../../../containers/imageInput";
import { Label } from "../../../containers/input/Input.styled";
import LetterBox from "../../../containers/letterBox/LetterBox";
import Switch from "../../../containers/switch";
import { IMinting } from "../Minting.types";
import { BadgeTitle } from "./BadgeTitle";
import { Description } from "./Description";
import { Edition } from "./Edition";
import { Price } from "./Price";
import {
  BottomLayOut,
  BottomHalfLayOut,
  InfoLayOut,
  LayOutFlexEnd,
  LayOut,
} from "./PublishBox.styled";
import { Royalty } from "./Royalty";

export const PublishBox = () => {
  const isDark = useRecoilValue(themeAtom).isDark;
  const { isLoading } = useQuery("minting");

  const { register, control, formState, watch, setValue } =
    useFormContext<IMinting>();
  const price = watch("salePrice");
  const edition = watch("editionTotal");
  const estimate = () => {
    return !isNaN(price * edition)
      ? (price * edition * (1 - SERVICE_FEE)).toFixed(2)
      : 0;
  };

  return (
    <LayOut>
      <Controller
        control={control}
        name="editionImage"
        rules={{
          required: "뱃지를 대표할 이미지가 필요해요",
          validate: {
            fileShouldBeImage: (f: File) =>
              f.type.split("/")[0] === "image" || "이미지만 입력할 수 있어요",
          },
        }}
        render={({ field: { onChange } }) => (
          <ImageInput
            onChange={async (file) => {
              const url = await onFileChange(file);
              console.log(file.lastmodified);
              url && setValue("editionImageUrl", url);
              onChange(file);
            }}
            title="뱃지 이미지 업로드"
            isDark={isDark}
            errMessage={formState.errors.editionImage?.message}
            register={register("editionImage", {
              required: "뱃지 이미지가 반드시 필요해요",
            })}
          />
        )}
      />

      <InfoLayOut isDark={isDark}>
        <BadgeTitle isDark={isDark} />
        <Description isDark={isDark} />
        <BottomLayOut>
          <BottomHalfLayOut>
            <Edition isDark={isDark} />
            <Royalty isDark={isDark} />
          </BottomHalfLayOut>
          <BottomHalfLayOut>
            <Price isDark={isDark} />
            <LayOutFlexEnd>
              <Label isDark={isDark}>가스비 부담할게요</Label>
              <Switch isDark={isDark} onToggle={() => {}} />
            </LayOutFlexEnd>
            <LayOutFlexEnd>
              <LetterBox color={isDark ? "light" : "primary"}>
                Service Fee: 2.5%
              </LetterBox>
              <LetterBox color={isDark ? "light" : "primary"}>
                You will receive {edition && price ? estimate() : 0} ETH
              </LetterBox>
            </LayOutFlexEnd>
          </BottomHalfLayOut>
        </BottomLayOut>
      </InfoLayOut>
    </LayOut>
  );
};
