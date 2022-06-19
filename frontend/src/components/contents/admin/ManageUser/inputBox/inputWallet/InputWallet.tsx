import axios from "axios";
import { UseFormHandleSubmit } from "react-hook-form";
import { useRecoilState } from "recoil";
import { ThemeType } from "../../../../../../global/theme";
import { adminState } from "../../../../../../recoil/admin";
import Button from "../../../../../containers/button";
import { InputAddress } from "./inputAddress/InputAddress";
import { IManageUser } from "../../ManageUser.types";
import styled from "styled-components";

const InputBox = styled.div`
  display: flex;
`;
const ButtonBox = styled.div`
  width: 150px;
`;
interface IInputWallet extends ThemeType {
  handleSubmit: UseFormHandleSubmit<IManageUser>;
}

export const InputWallet = ({ isDark, handleSubmit }: IInputWallet) => {
  const [adminStateVal, setAdminStateVal] = useRecoilState(adminState);

  const onClickSearchUser = (res: any) => {
    let userWalletAddress = res.userWalletAddress;
    axios({
      method: "GET",
      url: "http://uts_url:8080/api/admin/search/user",
      params: {
        userWalletAddress: userWalletAddress,
      },
    }).then(function (res) {
      console.log(res);
      console.log(res.data.success);
      setAdminStateVal({
        ...adminStateVal,
        userNickname: res.data.success.userNickname,
        userRole: res.data.success.userRole,
        userSeq: res.data.success.userSeq,
        artistSeq: res.data.success.artistSeq,
      });
      console.log(adminStateVal);
    });
  };

  return (
    <InputBox>
      <InputAddress isDark={isDark}></InputAddress>
      <ButtonBox>
        <Button
          styleVariant="primary"
          onClick={handleSubmit(onClickSearchUser)}
        >
          검색
        </Button>
      </ButtonBox>
    </InputBox>
  );
};
