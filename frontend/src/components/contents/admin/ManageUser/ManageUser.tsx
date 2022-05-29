import { Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import LetterBox from "../../../containers/letterBox/LetterBox";
import axios from "axios";
import { useRecoilState } from "recoil";
import { adminState } from "../../../../recoil/admin";
import { useState } from "react";
import Button from "../../../containers/button";
import {
  ButtonBox,
  ControlBox,
  InputBox,
  ManageUserDiv,
  SearchBox,
  TextBox,
} from "./ManageUser.styled";
import { ArtistManageForm } from "./artistManageForm/ArtistManageForm";
import { ThemeType } from "../../../../global/theme";
import { useForm, FormProvider } from "react-hook-form";
import { IManageUser } from "./ManageUser.types";
import { InputWallet } from "./inputBox/inputWallet/InputWallet";

interface IManageUserMain extends ThemeType {}
export const ManageUser = ({ isDark }: IManageUserMain) => {
  const [adminStateVal, setAdminStateVal] = useRecoilState(adminState);
  const [walletAddress, setWalletAddress] = useState("");
  const forms = useForm<IManageUser>();

  const AddArtist = () => {
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/admin/artist/accept",
      params: {
        userSeq: adminStateVal.userSeq,
        commonCodeSeq: 1,
        artistDescription: "하이하이",
        artistSns: "하이하이",
      },
    }).then(function (res) {
      console.log(res);
      console.log(adminStateVal);
      message.success("해당 유저는 아티스트 권한을 부여받았습니다.");
    });
  };

  const DeleteArtist = () => {
    console.log(adminStateVal);
    let userSeq = adminStateVal.userSeq;
    let artistSeq = adminStateVal.artistSeq;
    axios({
      method: "PUT",
      url: "http://j6a105.p.ssafy.io:8080/api/admin/artist/cancel",
      params: {
        userSeq: userSeq,
        artistSeq: artistSeq,
      },
    }).then(function (res) {
      console.log(res);
      message.error("해당 아티스트의 권한이 삭제되었습니다.");
    });
  };

  return (
    <ManageUserDiv>
      <LetterBox size="h1">회원 관리하기</LetterBox>
      <ControlBox>
        <SearchBox>
          <FormProvider {...forms}>
            <InputBox>
              <InputWallet
                isDark={isDark}
                handleSubmit={forms.handleSubmit}
              ></InputWallet>
            </InputBox>
          </FormProvider>
        </SearchBox>
        {adminStateVal.userNickname ? (
          <TextBox>
            <LetterBox size="body1">
              회원명: {adminStateVal.userNickname}
            </LetterBox>
            <br></br>
            <LetterBox size="body1">
              {adminStateVal.userRole === 0 ? "일반유저" : "아티스트"}입니다.
            </LetterBox>
            {adminStateVal.userRole === 0 ? (
              <>
                <FormProvider {...forms}>
                  <ArtistManageForm
                    isDark={isDark}
                    handleSubmit={forms.handleSubmit}
                  ></ArtistManageForm>
                </FormProvider>
              </>
            ) : (
              <></>
            )}
          </TextBox>
        ) : (
          <div></div>
        )}

        {adminStateVal.userRole === 1 ? (
          <ButtonBox>
            <Popconfirm
              title="해당 아티스트에 권한을 부여하시겠습니까?"
              onConfirm={AddArtist}
            >
              <Button styleVariant="primary">아티스트 등록하기</Button>
            </Popconfirm>
            <Popconfirm
              title="해당 아티스트의 권한을 삭제하시겠습니까?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={DeleteArtist}
            >
              <Button styleVariant="primary">아티스트 취소하기</Button>
            </Popconfirm>
          </ButtonBox>
        ) : (
          <></>
        )}
      </ControlBox>
    </ManageUserDiv>
  );
};
