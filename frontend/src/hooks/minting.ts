import { create } from "ipfs-http-client";
import { IMinting } from "../components/contents/minting/Minting.types";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { MARKET_ADDR, MARKET_ABI } from "../config";

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
  console.log(data);

  try {
    console.log("data:", data);
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
  const market = new ethers.Contract(MARKET_ADDR, MARKET_ABI, signer);
  const listingPrice = "0";
  const transAction = await market.createBadge(url, price, props.editionTotal, {
    value: listingPrice,
  });
  const tx = await transAction.wait();
  console.log(tx);
};
