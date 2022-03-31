import { Controller, useFormContext } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../../recoil/theme";
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
  const { register, watch, control, formState } = useFormContext<IMinting>();
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
            onChange={onChange}
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
                You will receive {} ETH
              </LetterBox>
            </LayOutFlexEnd>
          </BottomHalfLayOut>
        </BottomLayOut>
      </InfoLayOut>
    </LayOut>
  );
};
