import LetterBox from "../../../../containers/letterBox/LetterBox";
import { Progress } from "antd";
import { ThemeType } from "../../../../../global/theme";
import { useNavigate } from "react-router-dom";
import {
  EditionItemDetail,
  EditionItemDiv,
  EditionItemImg,
  EditionItemMoreDetail,
} from "./EditionItem.styled";
import { artistDetailState } from "../../../../../recoil/artistDetail";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

interface IEditionItem extends ThemeType {
  editionItem: any;
}

export const EditionItem = ({ isDark, editionItem }: IEditionItem) => {
  // recoil
  const [artistDetailStateVal, setArtistDetailStateVal] =
    useRecoilState(artistDetailState);

  // useNavigate
  let navigate = useNavigate();

  // useState
  const [gauge, setGauge] = useState(0);

  // let
  let date = editionItem.edition_reg_dt.substr(0, 10);
  // let gauge =
  //   ((parseInt(editionItem.all_count) - parseInt(editionItem.on_sale)) /
  //     parseInt(editionItem.all_count)) *
  //   100; // 게이지 = 판매 개수 / 전체 개수 * 100

  // useEffect
  useEffect(() => {
    if (editionItem.all_count === editionItem.on_sale) {
      setGauge(100);
    } else {
      setGauge(
        ((parseInt(editionItem.all_count) - parseInt(editionItem.on_sale)) /
          parseInt(editionItem.all_count)) *
          100
      );
    }
  }, []);

  return (
    <EditionItemDiv
      isDark={isDark}
      onClick={() => {
        navigate(`/edition/${editionItem.edition_seq}`);
      }}
    >
      <EditionItemImg src={editionItem.edition_edition_image} />
      <EditionItemDetail>
        <LetterBox size="h3" weight="extraBold">
          {editionItem.edition_edition_name}
        </LetterBox>
        <EditionItemMoreDetail>
          <span style={{ width: 300, fontSize: 15 }}>
            From {editionItem.min_price}ETH ~
          </span>
          <span style={{ width: 300, fontSize: 15 }}>{date}</span>
          <Progress
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percent={gauge}
            showInfo={false}
          />
          <LetterBox>{gauge}%</LetterBox>
        </EditionItemMoreDetail>
      </EditionItemDetail>
    </EditionItemDiv>
  );
};
