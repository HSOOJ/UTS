import { create } from "ipfs-http-client";

import {
  IMinting,
  IMintingBE,
} from "../components/contents/minting/Minting.types";
import Web3Modal from "web3modal";
import { BigNumber, ethers } from "ethers";
import { MARKET_ADDR, MARKET_ABI } from "../config";
import axios from "axios";
import { IBadge, Meta } from "../types/IBadge";

const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

// test
// title: McIlroy Is Your Own Coach
// description: I'll be your coach and you can play golf with me.  I'll be your coach and you can play golf with me.

// 이미지가 변경되면 ipfs에 업로드
export const onFileChange = async (file: File) => {
  const newFile = new File([file], file.name, { type: file.type });
  try {
    const added = await ipfs.add(newFile, {
      progress: (prog) => console.log(`received: ${prog}`),
    });
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    return url;
  } catch (err) {
    console.log(err);
  }
};

// 메타데이터를 ipfs에 업로드
export const uploadToIPFS = async ({
  editionName,
  editionImageUrl,
  editionDescription,
}: IMinting) => {
  const data = JSON.stringify({
    editionName,
    editionImageUrl,
    editionDescription,
  });

  try {
    const added = await ipfs.add(data);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    return url;
  } catch (error) {
    alert(error);
  }
};

export const listBadgeForSale = async (props: IMinting) => {
  const url = await uploadToIPFS(props);
  console.log(1);
  const web3Modal = new Web3Modal();
  console.log(2);
  const connection = await web3Modal.connect();
  console.log(3);
  const provider = new ethers.providers.Web3Provider(connection);
  console.log(4);
  const signer = provider.getSigner();
  console.log(5);
  const price = ethers.utils.parseUnits(props.salePrice + "", "ether");
  const total = ethers.utils.parseUnits(
    (props.salePrice * props.editionTotal).toString(),
    "ether"
  );
  console.log(6);
  const market = new ethers.Contract(MARKET_ADDR, MARKET_ABI, signer);
  console.log(7);
  const listingPrice = market.calcFee(total);
  console.log(8);
  const transAction = await market.createBadge(url, price, props.editionTotal, {
    value: listingPrice,
  });

  const tx = await transAction.wait();
  console.log("tx arrived!");
  const events = tx.events;
  const badgeIds: number[] = events
    .filter((event: { event: string }) => event.event === "MarketBadgeCreated")
    .map((event: { args: { badgeId: BigNumber } }) =>
      event.args.badgeId.toNumber()
    );

  const beProps = ({
    editionName,
    editionImageUrl,
    editionDescription,
    editionRoyalty,
    editionTotal,
    salePrice,
  }: IMinting) => ({
    editionName,
    editionImage: editionImageUrl,
    editionDescription,
    editionRoyalty,
    editionTotal,
    salePrice,
  });

  const data: IMintingBE = {
    userSeq: localStorage.getItem("userSeq") as string,
    ...beProps(props),
    nftId: badgeIds[0].toString(),
    nftTransactionId: events[0].transactionHash,
  };
  listBadgeToBackEnd(data);
};

export const loadBadgeURI = async (badgeId: number) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://ropsten.infura.io/v3/851bad79e47b4833a7c082d66c2bc4ab"
  );
  const market = new ethers.Contract(MARKET_ADDR, MARKET_ABI, provider);
  const data = await market.tokenURI(badgeId);
  console.log(data);
};

export const loadBadges = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://ropsten.infura.io/v3/851bad79e47b4833a7c082d66c2bc4ab"
  );
  const market = new ethers.Contract(MARKET_ADDR, MARKET_ABI, provider);
  const data = await market.fetchMarketBadges();
  const badges = await Promise.all<IBadge & Meta>(
    data.map(async (badge: IBadge) => {
      const tokenUri = await market.tokenURI(badge.badgeId);
      const meta = await axios.get(tokenUri);
      const price = ethers.utils.formatUnits(badge.price + "", "ether");
      return {
        price,
        badgeId: badge.badgeId.toNumber(),
        seller: badge.seller,
        owner: badge.owner,
        image: meta.data.editionImageUrl,
        name: meta.data.editionName,
        description: meta.data.editionDescription,
      };
    })
  );
  return badges;
};

export const listBadgeToBackEnd = async ({
  userSeq,
  editionName,
  editionImage,
  editionDescription,
  editionRoyalty,
  editionTotal,
  salePrice,
  nftId,
  nftTransactionId,
}: IMintingBE) => {
  axios({
    method: "POST",
    url: "http://j6a105.p.ssafy.io:8080/api/nft/minting",
    data: {
      userSeq,
      editionName,
      editionImage,
      editionDescription,
      editionRoyalty,
      editionTotal,
      salePrice,
      nftId,
      nftTransactionId,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {
      console.log(res);
    });
};

export const getLatestEdition = async () => {
  return await axios.get("http://j6a105.p.ssafy.io:8080/api/edition/seq");
  // .then((data) => {
  //   // console.log(data.data.success.max);
  //   return data.data.success.max;
  // })
  // .catch((err) => console.log(err));
};

export const resellBadge = async (id: number, price: number) => {
  if (!price) return;
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  const priceFormatted = ethers.utils.parseUnits(price + "", "ether");
  let market = new ethers.Contract(MARKET_ADDR, MARKET_ABI, signer);
  let listingPrice = await market.calcFee(price);

  listingPrice = listingPrice.toString();
  let transaction = await market.resellBadge(id, priceFormatted, {
    value: listingPrice,
  });
  await transaction.wait();
};
