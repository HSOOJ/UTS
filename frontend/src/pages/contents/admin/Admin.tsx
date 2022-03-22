import { useRecoilValue } from "recoil";
import { AdminNav } from "../../../components/contents/admin/AdminNav";
import { ManageUser } from "../../../components/contents/admin/ManageUser";
import { ReportUser } from "../../../components/contents/admin/ReportUser";
import { adminState } from "../../../recoil/admin";

export const Admin = () => {
  // recoil
  const { manageUser } = useRecoilValue(adminState);

  return (
    <>
      <AdminNav />
      {manageUser ? <ManageUser /> : <ReportUser />}
    </>
  );
};
