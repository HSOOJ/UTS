import { Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import LetterBox from "../../../containers/letterBox/LetterBox";
import Input from "../../../containers/input";
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

export const ManageUser = () => {
  const [adminStateVal, setAdminStateVal] = useRecoilState(adminState);
  const [walletAddress, setWalletAddress] = useState("");

  const AddArtist = () => {
    message.success("해당 유저는 아티스트 권한을 부여받았습니다.");
  };

  const DeleteArtist = () => {
    message.error("해당 아티스트의 권한이 삭제되었습니다.");
  };

  const onClickSearchUser = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/admin/search/user",
      params: {
        userWalletAddress: "0x123345",
      },
    }).then(function (res) {
      console.log(res);
      setAdminStateVal({
        ...adminStateVal,
        userNickname: res.data.success.userNickname,
        userRole: res.data.success.userRole,
      });
      console.log(adminStateVal);
    });
  };

  return (
    <ManageUserDiv>
      <LetterBox size="h1">회원 관리하기</LetterBox>
      <ControlBox>
        <SearchBox>
          <InputBox>
            <Input
              type="search"
              placeholder="회원님의 지갑 주소를 입력해주세요"
            ></Input>
          </InputBox>
          <Button styleVariant="primary" onClick={onClickSearchUser}>
            검색
          </Button>
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
          </TextBox>
        ) : (
          <div></div>
        )}
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
      </ControlBox>
    </ManageUserDiv>
  );
};
