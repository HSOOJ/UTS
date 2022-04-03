import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Palette from "../../../foundation/color/Palette";
import { ThemeType } from "../../../global/theme";
import { adminState } from "../../../recoil/admin";
import { themeAtom } from "../../../recoil/theme";
import Button from "../../containers/button";
import { ManageUser } from "./ManageUser/ManageUser";
import { ReportUser } from "./ReportUser/ReportUser";

const ModalDiv = styled.div<ThemeType>`
  margin-top: 50px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  background-color: ${({ isDark }) => (isDark ? Palette.Nero100 : `#e3ebff`)};
  width: 1000px;
  gap: 10px;
  border-radius: 10px;
  z-index: 100;
  margin-left: 25%;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
`;
export const AdminCompo = () => {
  const isDark = useRecoilValue(themeAtom).isDark;
  const [adminStateVal, setAdminStateVal] = useRecoilState(adminState);

  const onClickManageUser = () => {
    setAdminStateVal({ ...adminStateVal, manageUser: true });
  };

  const onClickReportUser = () => {
    setAdminStateVal({
      ...adminStateVal,
      manageUser: false,
      userNickname: "",
      userRole: 0,
    });
  };

  const { manageUser } = useRecoilValue(adminState);
  return (
    <ModalDiv isDark={isDark}>
      <ButtonBox>
        <Button styleVariant="primary" onClick={onClickManageUser}>
          회원 관리하기
        </Button>
        <Button styleVariant="secondary" onClick={onClickReportUser}>
          신고 관리하기
        </Button>
      </ButtonBox>
      {manageUser ? <ManageUser isDark={isDark} /> : <ReportUser />}
    </ModalDiv>
  );
};
