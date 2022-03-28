import { useRecoilValue } from "recoil";
import { ManageUser } from "./ManageUser/ManageUser";
import { ReportUser } from "../../../components/contents/admin/ReportUser/ReportUser";
import { adminState } from "../../../recoil/admin";

export const AdminCompo = () => {
  // recoil
  const { manageUser } = useRecoilValue(adminState);

  return <>{manageUser ? <ManageUser /> : <ReportUser />}</>;
};
