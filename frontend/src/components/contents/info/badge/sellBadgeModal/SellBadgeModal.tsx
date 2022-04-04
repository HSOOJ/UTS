import { FormProvider, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { badgeDetailState } from "../../../../../recoil/BadgeDetail";
import { ModalDiv } from "./SellBadgeModal.styled";
import { ISellBadge } from "./SellBadgeModal.types";
import { SellBadgeForm } from "./sellBadgeForm/SellBadgeForm";

interface ISellBadgeModal extends ThemeType {}

export const SellBadgeModal = ({ isDark }: ISellBadgeModal) => {
  const badgeDetailStateVal = useRecoilValue(badgeDetailState);
  const forms = useForm<ISellBadge>();

  return (
    <div>
      {badgeDetailStateVal.isOpenSellModal === true ? (
        <FormProvider {...forms}>
          <ModalDiv isDark={isDark}>
            <SellBadgeForm
              isDark={isDark}
              handleSubmit={forms.handleSubmit}
            ></SellBadgeForm>
          </ModalDiv>
        </FormProvider>
      ) : (
        <div></div>
      )}
    </div>
  );
};
