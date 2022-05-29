// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Market is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _badgeIds;
    Counters.Counter private _badgesSold;
    using SafeMath for uint256;

    address payable owner;

    struct MarketBadge {
        uint256 badgeId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketBadge) private marketBadgeIdx;

    event MarketBadgeCreated(
        uint256 indexed badgeId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() ERC721("SSAFY Token", "SSF") {
        owner = payable(msg.sender);
    }

    function calcFee(uint256 _num) public view returns (uint256) {
        uint256 onePercentofTokens = _num.mul(100).div(100 * 10**uint256(2));
        uint256 twoPercentOfTokens = onePercentofTokens.mul(2);
        uint256 halfPercentOfTokens = onePercentofTokens.div(2);
        console.log(twoPercentOfTokens + halfPercentOfTokens);
        return twoPercentOfTokens + halfPercentOfTokens;
    }

    function createBadge(
        string memory badgeURI,
        uint256 price,
        uint256 _amount
    ) public payable returns (uint256[] memory) {
        uint256[] memory newBadgeIdList = new uint256[](_amount);
        for (uint256 i = 0; i < _amount; i++) {
            _badgeIds.increment();
            uint256 newBadgeId = _badgeIds.current();
            newBadgeIdList[i] = newBadgeId;

            _mint(msg.sender, newBadgeId);
            _setTokenURI(newBadgeId, badgeURI);
            createMarketBadge(newBadgeId, price, _amount);
        }
        return newBadgeIdList;
    }

    function createMarketBadge(
        uint256 badgeId,
        uint256 price,
        uint256 amount
    ) private {
        uint256 listingPrice = this.calcFee(price * amount);
        // prevent reEntry attack modifier
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        marketBadgeIdx[badgeId] = MarketBadge(
            badgeId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _transfer(msg.sender, address(this), badgeId);
        emit MarketBadgeCreated(
            badgeId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    function resellBadge(uint256 badgeId, uint256 price) public payable {
        uint256 listingPrice = this.calcFee(price);
        require(
            marketBadgeIdx[badgeId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        marketBadgeIdx[badgeId].sold = false;
        marketBadgeIdx[badgeId].price = price;
        marketBadgeIdx[badgeId].seller = payable(msg.sender);
        marketBadgeIdx[badgeId].owner = payable(address(this));
        _badgesSold.decrement();

        _transfer(msg.sender, address(this), badgeId);
    }

    function createMarketSale(uint256 badgeId) public payable {
        uint256 price = marketBadgeIdx[badgeId].price; //가격 가져옴
        uint256 listingPrice = this.calcFee(price);

        address seller = marketBadgeIdx[badgeId].seller;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        console.log("price is", price, "msg value is", msg.value);
        marketBadgeIdx[badgeId].owner = payable(msg.sender);
        marketBadgeIdx[badgeId].sold = true;
        marketBadgeIdx[badgeId].seller = payable(address(0));
        _badgesSold.increment();
        _transfer(address(this), msg.sender, badgeId);
        payable(owner).transfer(listingPrice);
        payable(seller).transfer(msg.value);
    }

    function fetchMarketBadges() public view returns (MarketBadge[] memory) {
        uint256 badgeCount = _badgeIds.current();
        uint256 unsoldBadgeCount = _badgeIds.current() - _badgesSold.current();
        uint256 currentIndex = 0;

        MarketBadge[] memory badges = new MarketBadge[](unsoldBadgeCount);
        for (uint256 i = 0; i < badgeCount; i++) {
            if (marketBadgeIdx[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
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
                uint256 currentId = i + 1;
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
                uint256 currentId = i + 1;
                MarketBadge storage currentBadge = marketBadgeIdx[currentId];
                badges[currentIndex] = currentBadge;
                currentIndex += 1;
            }
        }
        return badges;
    }

    function getBadgeSeller(uint256 badgeId) public view returns (address) {
        return marketBadgeIdx[badgeId].seller;
    }

    function getBadgeOwner(uint256 badgeId) public view returns (address) {
        return marketBadgeIdx[badgeId].owner;
    }

    function getBadgePrice(uint256 badgeId) public view returns (uint256){
        return marketBadgeIdx[badgeId].price;
    }
    function getBadgeSold(uint256 badgeId) public view returns (bool) {
        return marketBadgeIdx[badgeId].sold;
    }
}
