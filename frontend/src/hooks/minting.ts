import { create } from "ipfs-http-client";
import { IMinting } from "../components/contents/minting/Minting.types";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { BADGE_ADDR, MARKET_ADDR, MARKET_ABI, BADGE_ABI } from "../config";

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
export const createMarketBadge = async ({
  editionName,
  editionImageUrl,
  editionDescription,
  editionTotal,
  salePrice,
}: IMinting) => {
  const data = JSON.stringify({
    editionName,
    editionImageUrl,
    editionDescription,
  });
  console.log(data);

  try {
    const added = await ipfs.add(data);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    createSale(url, editionTotal, salePrice);
  } catch (error) {
    alert(error);
  }
};

export const createSale = async (
  url: string,
  editionTotal: number,
  salePrice: number
) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  const badge = new ethers.Contract(BADGE_ADDR, BADGE_ABI, signer);
  const transAction = await badge.createToken(url, editionTotal);
  const tx = await transAction.wait();
  console.log(tx);

  const event = tx.events[0];
  // const value = event.args[2];
  // const tokenId = value.toNumber();

  const price = ethers.utils.parseUnits(salePrice + "", "ether");

  const market = new ethers.Contract(MARKET_ADDR, MARKET_ABI, signer);
  // const listingPrice = await market.calcFee(salePrice);
  console.log(badge);
  console.log(market);
};
