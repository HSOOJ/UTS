import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { listBadgeForSale } from "../../../hooks/minting";
import { themeAtom } from "../../../recoil/theme";
import { IReactNode } from "../../../types/IReactNode";
import { FormLayOut } from "./Minting.styled";
import { IMinting } from "./Minting.types";
import Signature from "./signature";

interface IMint extends IReactNode {
  handleSubmit: UseFormHandleSubmit<IMinting>;
}

const Minting = ({ handleSubmit, children }: IMint) => {
  const isDark = useRecoilValue(themeAtom).isDark;
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(listBadgeForSale, {
    onError: (err) => {
      alert(`서명이 중단 되었습니다. \n${err}`);
    },
    onSuccess: async () => {
      setTimeout(() => navigate(`/`), 3000);
      alert("민팅에 성공했습니다! 홈으로 이동합니다.");
    },
  });

  const onSubmit: SubmitHandler<IMinting> = (data) => {
    mutate(data);
  };

  return (
    <FormLayOut isDark={isDark} onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <Signature />}
      {children}
    </FormLayOut>
  );
};

export default Minting;
