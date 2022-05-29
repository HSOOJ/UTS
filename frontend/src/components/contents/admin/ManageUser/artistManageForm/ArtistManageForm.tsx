import { message } from "antd";
import axios from "axios";
import { UseFormHandleSubmit } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { adminState } from "../../../../../recoil/admin";
import Button from "../../../../containers/button";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import { Inputbox } from "../inputBox/Inputbox";
import { ButtonBox } from "../ManageUser.styled";
import { IManageUser } from "../ManageUser.types";
import {
  ArtistAcceptDiv,
  ArtistManageFormDiv,
} from "./ArtistManageForm.styled";

interface IArtistManage extends ThemeType {
  handleSubmit: UseFormHandleSubmit<IManageUser>;
}

export const ArtistManageForm = ({ isDark, handleSubmit }: IArtistManage) => {
  const adminStateVal = useRecoilValue(adminState);

  const onSubmit = (res: any) => {
    let commonCodeSeq = res.commonCodeSeq;
    let artistDescription = res.artistDescription;
    let artistSns = res.artistSns;
    console.log(adminStateVal);
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/admin/artist/accept",
      data: {
        userSeq: adminStateVal.userSeq,
        commonCodeSeq: commonCodeSeq,
        artistDescription: artistDescription,
        artistSns: artistSns,
      },
    })
      .then(function (res) {
        console.log(res);
        message.success("해당 유저는 아티스트 권한을 부여받았습니다.");
      })
      .catch(function (res) {
        console.log(res);
      });
  };

  return (
    <ArtistManageFormDiv isDark={isDark}>
      <LetterBox size="h1">아티스트 상세 정보 작성</LetterBox>
      <ArtistAcceptDiv>
        <Inputbox isDark={isDark}></Inputbox>
        <ButtonBox>
          <Button styleVariant="primary" onClick={handleSubmit(onSubmit)}>
            아티스트 등록하기
          </Button>
          <Button styleVariant="primary">아티스트 취소하기</Button>
        </ButtonBox>
      </ArtistAcceptDiv>
    </ArtistManageFormDiv>
  );
};
