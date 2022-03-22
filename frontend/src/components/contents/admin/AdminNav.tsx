import { useRecoilState } from "recoil";
import { adminState } from "../../../recoil/admin";

export const AdminNav = () => {
  const [manageUser, setManageUser] = useRecoilState(adminState);

  const onClickManageUser = () => {
    setManageUser({ ...adminState, manageUser: true });
  };

  const onClickReportUser = () => {
    setManageUser({ ...adminState, manageUser: false });
  };

  return (
    <div>
      <button onClick={onClickManageUser}>회원 관리하기</button>
      <button onClick={onClickReportUser}>신고 관리하기</button>
    </div>
  );
};
