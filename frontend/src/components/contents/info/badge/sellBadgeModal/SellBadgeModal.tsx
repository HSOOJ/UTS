import { FormProvider, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { badgeDetailState } from "../../../../../recoil/BadgeDetail";
import { ModalDiv } from "./SellBadgeModal.styled";
import { ISellBadge } from "./SellBadgeModal.types";
import { SellBadgeForm } from "./sellBadgeForm/SellBadgeForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { resellBadge } from "../../../../../hooks/minting";
interface ISellBadgeModal extends ThemeType {
  mybadgeid: number
}

export const SellBadgeModal = ({ isDark, mybadgeid }: ISellBadgeModal) => {
  const badgeDetailStateVal = useRecoilValue(badgeDetailState);
  const forms = useForm<ISellBadge>();
  const [nftPrice, setNftPrice] = useState(0);
  const [nftId, setNftId] = useState(0);
  const getNftInfo = async () => {
    await axios({
      method: "get",
      url: `http://uts_url:8080/api/nft/info?nftSeq=${badgeDetailStateVal.badgeId}`
    }).then((res) => {
      setNftPrice(res.data.success.salePrice.sale_price)
      setNftId(res.data.success.nftinfo.nft_id)
    })
  }

  useEffect(() => {
    getNftInfo()
  }, [])

  useEffect(() => {
    getNftInfo()
  }, [badgeDetailStateVal.badgeId])

  return (
    <div>
      {badgeDetailStateVal.isOpenSellModal === true ? (
        <FormProvider {...forms}>
          <ModalDiv isDark={isDark}>
            <SellBadgeForm
              isDark={isDark}
              handleSubmit={forms.handleSubmit}
              mybadgeid={mybadgeid}
            ></SellBadgeForm>
          </ModalDiv>
        </FormProvider>
      ) : (
        <div></div>
      )}
    </div>
  );
};
