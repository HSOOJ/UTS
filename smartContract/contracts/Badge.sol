//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Badge is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _badgeIDs;
    address contractAddress;

    constructor(address utsMarketPlaceAddress) ERC721("Ssafy Token", "SSF") {
        contractAddress = utsMarketPlaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        _badgeIDs.increment();
        uint256 newBadgeId = _badgeIDs.current();

        _mint(msg.sender, newBadgeId);
        _setTokenURI(newBadgeId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newBadgeId;
    }
}
