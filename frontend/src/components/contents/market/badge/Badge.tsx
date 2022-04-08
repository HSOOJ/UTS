import axios from "axios";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { themeAtom } from "../../../../recoil/theme";
import { GridLayOut } from "./Badge.styled";
import { BadgeItem } from "./badgeItem/BadgeItem";
import { IBadgeItem } from "./badgeItem/BadgeItem.types";
import LoadingModal from "./loadingModal";

const getBadgeList = () =>
  axios({
    method: "get",
    url: "http://j6a105.p.ssafy.io:8080/api/market/nfts",
    params: {
      sortby: 0,
      category: 0,
    },
  }).then((res) => {
    // console.log(res);
    // setDatas(res.data.success);
    // setLoading(false);

    return res.data.success;
  });

export const Badge = () => {
  const isDark = useRecoilValue(themeAtom).isDark;

  // useState
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idxLoad, setIdxLoad] = useState(24);

  // Axios
  const GetNftsMarket = () =>
    axios({
      method: "get",
      url: "http://j6a105.p.ssafy.io:8080/api/market/nfts",
      params: {
        sortby: 0,
        category: 0,
      },
    }).then((res) => {
      console.log(res);
      setDatas(res.data.success);
      setLoading(false);
    });

  // useEffect
  useEffect(() => {
    GetNftsMarket();
  }, []);

  return (
    <GridLayOut>
      {isLoading ? (
        <LoadingModal />
      ) : (
        badges?.map(
          (api, idx) => api.nftPrice > 0 && <BadgeItem key={idx} {...api} />
        )
      )}
    </GridLayOut>
  );
};

export default Badge;

// styled component
const SpinContainer = styled.div`
  margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  width: 1200px;
  height: 1200px;
`;
