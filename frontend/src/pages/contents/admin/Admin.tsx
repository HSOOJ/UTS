import { useRecoilValue } from "recoil";
import { AdminCompo } from "../../../components/contents/admin/AdminCompo";
import { AdminNav } from "../../../components/contents/admin/AdminNav";
import { adminState } from "../../../recoil/admin";

export const Admin = () => {
  // recoil
  const { manageUser } = useRecoilValue(adminState);

  return (
    <>
      <AdminNav />
      <AdminCompo />
    </>
  );
};
