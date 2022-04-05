import {
  SubmitHandler,
  useFormContext,
  UseFormHandleSubmit,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { listBadgeForSale } from "../../../hooks/minting";
import { themeAtom } from "../../../recoil/theme";
import { IReactNode } from "../../../types/IReactNode";
import { FormLayOut } from "./Minting.styled";
import { IMinting } from "./Minting.types";

interface IMint extends IReactNode {
  handleSubmit: UseFormHandleSubmit<IMinting>;
}

const Minting = ({ handleSubmit, children }: IMint) => {
  const isDark = useRecoilValue(themeAtom).isDark;
  const {} = useFormContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IMinting> = (data) => {
    // tmp
    console.log("transmitting to blockchain network...", data);
    // blockChain api 들어가야 함
    listBadgeForSale(data).then(() => {
      navigate("/");
    });
  };

  return (
    <FormLayOut isDark={isDark} onSubmit={handleSubmit(onSubmit)}>
      {children}
    </FormLayOut>
  );
};

export default Minting;
