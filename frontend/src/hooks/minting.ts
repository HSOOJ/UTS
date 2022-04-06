import { create } from "ipfs-http-client";
import {
  IMinting,
  IMintingBE,
} from "../components/contents/minting/Minting.types";
import Web3Modal from "web3modal";
import { BigNumber, ethers } from "ethers";
import { MARKET_ADDR, MARKET_ABI } from "../config";
import axios from "axios";

const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

// test
// title: McIlroy Is Your Own Coach
// description: I'll be your coach and you can play golf with me.  I'll be your coach and you can play golf with me.

// 이미지가 변경되면 ipfs에 업로드
export const onFileChange = async (file: File) => {
  try {
    const added = await ipfs.add(file, {
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
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const price = ethers.utils.parseUnits(props.salePrice + "", "ether");
  const total = ethers.utils.parseUnits(
    (props.salePrice * props.editionTotal).toString(),
    "ether"
  );
  const market = new ethers.Contract(MARKET_ADDR, MARKET_ABI, signer);
  const listingPrice = market.calcFee(total);
  const transAction = await market.createBadge(url, price, props.editionTotal, {
    value: listingPrice,
  });

  const tx = await transAction.wait();
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

export const loadBadges = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://ropsten.infura.io/v3/851bad79e47b4833a7c082d66c2bc4ab"
  );
  console.log(provider);
  const market = new ethers.Contract(MARKET_ADDR, MARKET_ABI, provider);
  console.log(market);

  const data = await market.fetchMarketBadges();
  console.log(data);
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

export const buyBadge = async () => {
  /* needs the user to sign the transaction, so will use Web3Provider and sign it */
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(MARKET_ADDR, MARKET_ABI, signer);

  /* user will be prompted to pay the asking proces to complete the transaction */
  // const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
  // const transaction = await contract.createMarketSale(nft.tokenId, {
  //   value: price,
  // });
  // await transaction.wait();
  // loadNFTs();
};
