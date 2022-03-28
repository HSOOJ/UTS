import { GridLayOut } from "./Artist.styled";
import ArtistItem from "./artistItem";
import { IArtistItem } from "./artistItem/ArtistItem.types";

const APIs: IArtistItem[] = [
  {
    id: "1",
    backgroundSrc:
      "https://static.news.bitcoin.com/wp-content/uploads/2022/03/doge.jpg",
    profileSrc:
      "https://www.blockmedia.co.kr/wp-content/uploads/2021/02/%EC%9D%BC%EB%A1%A0%EB%A8%B8%EC%8A%A4%ED%81%AC_%EC%A0%95%EC%82%AC%EA%B2%A9%ED%98%95.jpg",
    name: "Elon Musk",
    category: "art",
    followers: 33009023,
    volume: 67832,
    highest: 32,
    transActions: 705321223,
    bestSellers: {
      tokenSrc:
        "https://image.binance.vision/uploads-original/0ee9d7d59d424a7c8bd7d70c86070beb.png",
      tokenName: "Doge Platinum",
      price: 32,
    },
    newestDrops: {
      tokenSrc: "https://imgs2.dab3games.com/dogecoin-miner-game.png",
      tokenName: "Doge Gold",
      price: 12.7,
    },
  },
  {
    id: "2",
    backgroundSrc:
      "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
    profileSrc:
      "https://dimg.donga.com/wps/NEWS/IMAGE/2021/01/17/104953245.2.jpg",
    name: "IU",
    category: "music",
    followers: 27458674,
    volume: 78123,
    highest: 36,
    transActions: 964125238,
    bestSellers: {
      tokenSrc:
        "https://img.khan.co.kr/news/2020/10/16/l_2020101601001687000138341.jpg",
      tokenName: "IU Gold",
      price: 12,
    },
    newestDrops: {
      tokenSrc:
        "https://img.khan.co.kr/news/2020/10/16/l_2020101601001687000138341.jpg",
      tokenName: "IU Premium",
      price: 36,
    },
  },
  {
    id: "3",
    backgroundSrc:
      "https://1.bp.blogspot.com/-vuI6a3EOV78/YJTvotOSl0I/AAAAAAAAOJE/QBOhNyjUyVI_Ek-NGtYf-ezlgzl35AXVgCLcBGAsYHQ/s16000/Son.jpg",
    profileSrc:
      "https://post-phinf.pstatic.net/MjAxOTAzMTBfODMg/MDAxNTUyMTcwMDA1Njky.jAUIM3EKVNmRgDhMOO-eyJJHsDA-ZUHOfgLWsMAUfG0g.d6Q55GNRKKgJOZSp1hFClAjthtkItRSsO2HlBJ6IQVQg.JPEG/%EC%86%90%ED%9D%A5%EB%AF%BC.jpg?type=w1200",
    name: "Son Heung-min",
    category: "music",
    followers: 5902301,
    volume: 6912,
    highest: 5.6,
    transActions: 781245,
    bestSellers: {
      tokenSrc:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201809/02/ee629a9b-4f95-42e5-8834-4175689710a6.jpg",
      tokenName: "hm_Son_NFT1",
      price: 12,
    },
    newestDrops: {
      tokenSrc:
        "http://img.tf.co.kr/article/home/2018/09/14/201864651536892097.jpg",
      tokenName: "hm_Son_NFT1",
      price: 36,
    },
  },
  {
    id: "4",
    backgroundSrc:
      "https://static.news.bitcoin.com/wp-content/uploads/2022/03/doge.jpg",
    profileSrc:
      "https://www.blockmedia.co.kr/wp-content/uploads/2021/02/%EC%9D%BC%EB%A1%A0%EB%A8%B8%EC%8A%A4%ED%81%AC_%EC%A0%95%EC%82%AC%EA%B2%A9%ED%98%95.jpg",
    name: "Elon Musk",
    category: "art",
    followers: 33009023,
    volume: 67832,
    highest: 32,
    transActions: 705321223,
    bestSellers: {
      tokenSrc:
        "https://image.binance.vision/uploads-original/0ee9d7d59d424a7c8bd7d70c86070beb.png",
      tokenName: "Doge Platinum",
      price: 32,
    },
    newestDrops: {
      tokenSrc: "https://imgs2.dab3games.com/dogecoin-miner-game.png",
      tokenName: "Doge Gold",
      price: 12.7,
    },
  },
  {
    id: "5",
    backgroundSrc:
      "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
    profileSrc:
      "https://dimg.donga.com/wps/NEWS/IMAGE/2021/01/17/104953245.2.jpg",
    name: "IU",
    category: "music",
    followers: 27458674,
    volume: 78123,
    highest: 36,
    transActions: 964125238,
    bestSellers: {
      tokenSrc:
        "https://img.khan.co.kr/news/2020/10/16/l_2020101601001687000138341.jpg",
      tokenName: "IU Gold",
      price: 12,
    },
    newestDrops: {
      tokenSrc:
        "https://img.khan.co.kr/news/2020/10/16/l_2020101601001687000138341.jpg",
      tokenName: "IU Premium",
      price: 36,
    },
  },
  {
    id: "6",
    backgroundSrc:
      "https://1.bp.blogspot.com/-vuI6a3EOV78/YJTvotOSl0I/AAAAAAAAOJE/QBOhNyjUyVI_Ek-NGtYf-ezlgzl35AXVgCLcBGAsYHQ/s16000/Son.jpg",
    profileSrc:
      "https://post-phinf.pstatic.net/MjAxOTAzMTBfODMg/MDAxNTUyMTcwMDA1Njky.jAUIM3EKVNmRgDhMOO-eyJJHsDA-ZUHOfgLWsMAUfG0g.d6Q55GNRKKgJOZSp1hFClAjthtkItRSsO2HlBJ6IQVQg.JPEG/%EC%86%90%ED%9D%A5%EB%AF%BC.jpg?type=w1200",
    name: "Son Heung-min",
    category: "music",
    followers: 5902301,
    volume: 6912,
    highest: 5.6,
    transActions: 781245,
    bestSellers: {
      tokenSrc:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201809/02/ee629a9b-4f95-42e5-8834-4175689710a6.jpg",
      tokenName: "hm_Son_NFT1",
      price: 12,
    },
    newestDrops: {
      tokenSrc:
        "http://img.tf.co.kr/article/home/2018/09/14/201864651536892097.jpg",
      tokenName: "hm_Son_NFT1",
      price: 36,
    },
  },
  {
    id: "7",
    backgroundSrc:
      "https://static.news.bitcoin.com/wp-content/uploads/2022/03/doge.jpg",
    profileSrc:
      "https://www.blockmedia.co.kr/wp-content/uploads/2021/02/%EC%9D%BC%EB%A1%A0%EB%A8%B8%EC%8A%A4%ED%81%AC_%EC%A0%95%EC%82%AC%EA%B2%A9%ED%98%95.jpg",
    name: "Elon Musk",
    category: "art",
    followers: 33009023,
    volume: 67832,
    highest: 32,
    transActions: 705321223,
    bestSellers: {
      tokenSrc:
        "https://image.binance.vision/uploads-original/0ee9d7d59d424a7c8bd7d70c86070beb.png",
      tokenName: "Doge Platinum",
      price: 32,
    },
    newestDrops: {
      tokenSrc: "https://imgs2.dab3games.com/dogecoin-miner-game.png",
      tokenName: "Doge Gold",
      price: 12.7,
    },
  },
  {
    id: "8",
    backgroundSrc:
      "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
    profileSrc:
      "https://dimg.donga.com/wps/NEWS/IMAGE/2021/01/17/104953245.2.jpg",
    name: "IU",
    category: "music",
    followers: 27458674,
    volume: 78123,
    highest: 36,
    transActions: 964125238,
    bestSellers: {
      tokenSrc:
        "https://img.khan.co.kr/news/2020/10/16/l_2020101601001687000138341.jpg",
      tokenName: "IU Gold",
      price: 12,
    },
    newestDrops: {
      tokenSrc:
        "https://img.khan.co.kr/news/2020/10/16/l_2020101601001687000138341.jpg",
      tokenName: "IU Premium",
      price: 36,
    },
  },
  {
    id: "9",
    backgroundSrc:
      "https://1.bp.blogspot.com/-vuI6a3EOV78/YJTvotOSl0I/AAAAAAAAOJE/QBOhNyjUyVI_Ek-NGtYf-ezlgzl35AXVgCLcBGAsYHQ/s16000/Son.jpg",
    profileSrc:
      "https://post-phinf.pstatic.net/MjAxOTAzMTBfODMg/MDAxNTUyMTcwMDA1Njky.jAUIM3EKVNmRgDhMOO-eyJJHsDA-ZUHOfgLWsMAUfG0g.d6Q55GNRKKgJOZSp1hFClAjthtkItRSsO2HlBJ6IQVQg.JPEG/%EC%86%90%ED%9D%A5%EB%AF%BC.jpg?type=w1200",
    name: "Son Heung-min",
    category: "music",
    followers: 5902301,
    volume: 6912,
    highest: 5.6,
    transActions: 781245,
    bestSellers: {
      tokenSrc:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201809/02/ee629a9b-4f95-42e5-8834-4175689710a6.jpg",
      tokenName: "hm_Son_NFT1",
      price: 12,
    },
    newestDrops: {
      tokenSrc:
        "http://img.tf.co.kr/article/home/2018/09/14/201864651536892097.jpg",
      tokenName: "hm_Son_NFT1",
      price: 36,
    },
  },
  {
    id: "10",
    backgroundSrc:
      "https://static.news.bitcoin.com/wp-content/uploads/2022/03/doge.jpg",
    profileSrc:
      "https://www.blockmedia.co.kr/wp-content/uploads/2021/02/%EC%9D%BC%EB%A1%A0%EB%A8%B8%EC%8A%A4%ED%81%AC_%EC%A0%95%EC%82%AC%EA%B2%A9%ED%98%95.jpg",
    name: "Elon Musk",
    category: "art",
    followers: 33009023,
    volume: 67832,
    highest: 32,
    transActions: 705321223,
    bestSellers: {
      tokenSrc:
        "https://image.binance.vision/uploads-original/0ee9d7d59d424a7c8bd7d70c86070beb.png",
      tokenName: "Doge Platinum",
      price: 32,
    },
    newestDrops: {
      tokenSrc: "https://imgs2.dab3games.com/dogecoin-miner-game.png",
      tokenName: "Doge Gold",
      price: 12.7,
    },
  },
  {
    id: "11",
    backgroundSrc:
      "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
    profileSrc:
      "https://dimg.donga.com/wps/NEWS/IMAGE/2021/01/17/104953245.2.jpg",
    name: "IU",
    category: "music",
    followers: 27458674,
    volume: 78123,
    highest: 36,
    transActions: 964125238,
    bestSellers: {
      tokenSrc:
        "https://img.khan.co.kr/news/2020/10/16/l_2020101601001687000138341.jpg",
      tokenName: "IU Gold",
      price: 12,
    },
    newestDrops: {
      tokenSrc:
        "https://img.khan.co.kr/news/2020/10/16/l_2020101601001687000138341.jpg",
      tokenName: "IU Premium",
      price: 36,
    },
  },
  {
    id: "12",
    backgroundSrc:
      "https://1.bp.blogspot.com/-vuI6a3EOV78/YJTvotOSl0I/AAAAAAAAOJE/QBOhNyjUyVI_Ek-NGtYf-ezlgzl35AXVgCLcBGAsYHQ/s16000/Son.jpg",
    profileSrc:
      "https://post-phinf.pstatic.net/MjAxOTAzMTBfODMg/MDAxNTUyMTcwMDA1Njky.jAUIM3EKVNmRgDhMOO-eyJJHsDA-ZUHOfgLWsMAUfG0g.d6Q55GNRKKgJOZSp1hFClAjthtkItRSsO2HlBJ6IQVQg.JPEG/%EC%86%90%ED%9D%A5%EB%AF%BC.jpg?type=w1200",
    name: "블라디미르 이브라히모비치 푸틴",
    category: "music",
    followers: 5902301,
    volume: 6912,
    highest: 5.6,
    transActions: 781245,
    bestSellers: {
      tokenSrc:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201809/02/ee629a9b-4f95-42e5-8834-4175689710a6.jpg",
      tokenName: "hm_Son_NFT1",
      price: 12,
    },
    newestDrops: {
      tokenSrc:
        "http://img.tf.co.kr/article/home/2018/09/14/201864651536892097.jpg",
      tokenName: "hm_Son_NFT1",
      price: 36,
    },
  },
];

export const Artist = () => {
  return (
    <GridLayOut>
      {APIs.map((api, idx) => (
        <ArtistItem key={api.id} {...api} />
      ))}
    </GridLayOut>
  );
};

export default Artist;
