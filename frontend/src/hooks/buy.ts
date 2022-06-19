import axios from "axios";
import { ethers } from "ethers";
import { url } from "inspector";
import Web3Modal from "web3modal";
import { MARKET_ABI, MARKET_ADDR } from "../config";

export const buyBadge = async (badgeId: string, badgePrice: number, nftSeq: number) => {
  /* needs the user to sign the transaction, so will use Web3Provider and sign it */
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const market = new ethers.Contract(MARKET_ADDR, MARKET_ABI, signer);
  /* user will be prompted to pay the asking proces to complete the transaction */
  const price = ethers.utils.parseUnits(badgePrice.toString(), "ether");
  console.log("buying check here", badgeId)
  console.log("buying check here", badgePrice)
  console.log(price);
  const transaction = await market.createMarketSale(parseInt(badgeId), {
    value: price,
  });
  await transaction.wait();
  reportToBE(nftSeq);
};

const reportToBE = async (nftSeq: number) => {
  console.log("buying check", localStorage.getItem("userSeq") as string)
  console.log("buying check nftSeq", nftSeq)
  axios({
    method: "POST",
    url: "http://uts_url:8080/api/nft/buy",
    data: {
      userSeq: localStorage.getItem("userSeq") as string,
      nftSeq,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {
      console.log(res);
    });
};
