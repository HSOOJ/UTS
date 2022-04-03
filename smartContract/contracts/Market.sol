// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Market is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _badgeIds;
    Counters.Counter private _badgesSold;
    using SafeMath for uint256;

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketBadge {
        uint256 badgeId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketBadge) private marketBadgeIdx;

    event MarketBadgeCreated(
        uint256 indexed badgeId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    function calcFee(uint256 _num) public view returns (uint256) {
        uint256 onePercentofTokens = _num.mul(100).div(100 * 10**uint256(2));
        uint256 twoPercentOfTokens = onePercentofTokens.mul(2);
        uint256 halfPercentOfTokens = onePercentofTokens.div(2);
        console.log(twoPercentOfTokens + halfPercentOfTokens);
        return twoPercentOfTokens + halfPercentOfTokens;
    }

    function createMarketBadge(
        address nftContract, // 디플로이할 컨트랙주소
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        uint256 listingPrice = this.calcFee(price);
        // prevent reEntry attack modifier
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        _badgeIds.increment();
        uint256 badgeId = _badgeIds.current();

        marketBadgeIdx[badgeId] = MarketBadge(
            badgeId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        // 컨트랙의 소유권을 센더로부터 스마트 컨트랙에게 보냄
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketBadgeCreated(
            badgeId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    function createMarketSale(
        address nftContract, // 가격 정보가 컨트랙에 있기 때문에 포함할 필요가 없음
        uint256 badgeId //
    ) public payable nonReentrant {
        uint256 price = marketBadgeIdx[badgeId].price; //가격 가져옴
        uint256 listingPrice = this.calcFee(price);
        uint256 tokenId = marketBadgeIdx[badgeId].tokenId; // 토큰 아이디 가져옴
        require(msg.value == price, "price should match listed price"); // 조건

        marketBadgeIdx[badgeId].seller.transfer(msg.value); // 셀러(addr)는 요청받은 밸류를 보냄
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId); // 토큰의 오너쉽을 보냄. 실제 전송이 이뤄지는 부분
        marketBadgeIdx[badgeId].owner = payable(msg.sender);
        marketBadgeIdx[badgeId].sold = true;
        _badgesSold.increment();
        payable(owner).transfer(listingPrice);
    }

    function fetchMarketBadges() public view returns (MarketBadge[] memory) {
        uint256 badgeCount = _badgeIds.current();
        uint256 unsoldBadgeCount = _badgeIds.current() - _badgesSold.current();
        uint256 currentIndex = 0;

        MarketBadge[] memory badges = new MarketBadge[](unsoldBadgeCount);
        for (uint256 i = 0; i < badgeCount; i++) {
            // 뱃지 오너가 비어있는 어드레스인지 검사
            if (marketBadgeIdx[i + 1].owner == address(0)) {
                uint256 currentId = marketBadgeIdx[i + 1].badgeId;
                MarketBadge storage currentBadge = marketBadgeIdx[currentId];
                badges[currentIndex] = currentBadge;

                currentIndex += 1;
            }
        }
        return badges;
    }

    function fetchMyBadges() public view returns (MarketBadge[] memory) {
        uint256 totalBadgeCount = _badgeIds.current();
        uint256 badgeCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalBadgeCount; i++) {
            if (marketBadgeIdx[i + 1].owner == msg.sender) {
                badgeCount += 1;
            }
        }

        MarketBadge[] memory badges = new MarketBadge[](badgeCount);
        for (uint256 i = 0; i < totalBadgeCount; i++) {
            if (marketBadgeIdx[i + 1].owner == msg.sender) {
                uint256 currentId = marketBadgeIdx[i + 1].badgeId;
                MarketBadge storage currentBadge = marketBadgeIdx[currentId];
                badges[currentIndex] = currentBadge;
                currentIndex += 1;
            }
        }
        return badges;
    }

    function fetchBadgesCreated() public view returns (MarketBadge[] memory) {
        uint256 totalBadgeCount = _badgeIds.current();
        uint256 badgeCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalBadgeCount; i++) {
            if (marketBadgeIdx[i + 1].seller == msg.sender) {
                badgeCount += 1;
            }
        }

        MarketBadge[] memory badges = new MarketBadge[](badgeCount);
        for (uint256 i = 0; i < totalBadgeCount; i++) {
            if (marketBadgeIdx[i + 1].seller == msg.sender) {
                uint256 currentId = marketBadgeIdx[i + 1].badgeId;
                MarketBadge storage currentBadge = marketBadgeIdx[currentId];
                badges[currentIndex] = currentBadge;
                currentIndex += 1;
            }
        }
        return badges;
    }
}
