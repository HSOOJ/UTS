import { ethers } from "hardhat";

describe("Market", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Market = await ethers.getContractFactory("Market");
    const market = await Market.deploy();
    await market.deployed();

    const marketAddress = market.address;

    const Badge = await ethers.getContractFactory("Badge");
    const badge = await Badge.deploy(marketAddress);
    await badge.deployed();
    const badgeContractAddress = badge.address;

    const auctionPrice = ethers.utils.parseUnits("100", "ether");
    const listingPrice = await market.calcFee(auctionPrice);

    await badge.createToken("https://www.mytokenlocation.com");
    await badge.createToken("https://www.mytokenlocation.com");

    // 상품 생성 테스트
    await market.createMarketBadge(badgeContractAddress, 1, auctionPrice, {
      value: listingPrice, // 리스팅비 낼 수 있는지 검증할 리스팅 비용도 함께 보냄
    });
    await market.createMarketBadge(badgeContractAddress, 2, auctionPrice, {
      value: listingPrice,
    });

    // 테스트용 어드레스 불러오기
    // hardhat에 내장돼 있는 어드레스를 불러 옴
    // 셀러는 겹치지 않게 하기 위해 언더바로 따로 뺌
    const [_, buyerAddress] = await ethers.getSigners();

    // 1번 상품 거래
    await market
      .connect(buyerAddress)
      .createMarketSale(badgeContractAddress, 1, { value: auctionPrice });

    // 마켓에 남아 있는 상품 조회
    const fetchedBadges = await market.fetchMarketBadges();

    const badges = await Promise.all(
      fetchedBadges.map(async (i) => {
        const tokenUri = await badge.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        };
        console.log(item);
      })
    );
    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
