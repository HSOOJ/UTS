import { useRecoilState, useRecoilValue } from "recoil";
import { adminState } from "../../../recoil/admin";
import { themeAtom } from "../../../recoil/theme";
import Button from "../../containers/button";
import { ManageUser } from "./ManageUser/ManageUser";
import { ReportUser } from "./ReportUser/ReportUser";
import { ModalDiv, ButtonBox } from "./AdminCompo.styled";

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
