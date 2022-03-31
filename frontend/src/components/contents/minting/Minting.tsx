import { useForm, UseFormHandleSubmit, UseFormProps } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../../../recoil/theme";
import { IReactNode } from "../../../types/IReactNode";
import { FormLayOut } from "./Minting.styled";
import { IMinting } from "./Minting.types";

interface IMint extends IReactNode {
  handleSubmit: UseFormHandleSubmit<IMinting>;
}

const Minting = ({ handleSubmit, children }: IMint) => {
  const isDark = useRecoilValue(themeAtom).isDark;

  const onSubmit = () => {
    // tmp
    console.log("transmitting to blockchain network...");
    // blockChain api 들어가야 함
  };

  return (
    <FormLayOut isDark={isDark} onSubmit={handleSubmit(onSubmit)}>
      {children}
    </FormLayOut>
  );
};

export default Minting;
