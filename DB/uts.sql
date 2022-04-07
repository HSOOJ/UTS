DROP SCHEMA IF EXISTS uts;
CREATE SCHEMA IF NOT EXISTS uts DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
use uts;

-- 회원 테이블
CREATE TABLE `user` (
  `user_seq` int NOT NULL AUTO_INCREMENT,
  `user_nickname` varchar(20) NOT NULL,
  `user_wallet_address` varchar(100) NOT NULL,
  `user_profile_image` varchar(100) NOT NULL,
  `user_role` int NOT NULL DEFAULT '0' COMMENT '0:회원, 1:아티스트, 2: 관리자',
  `user_volume` double NOT NULL,
  `reg_dt` datetime NOT NULL,
  `mod_dt` datetime NOT NULL,
  `del_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`user_seq`),
  UNIQUE KEY `user_seq_UNIQUE` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 공통 코드 테이블
CREATE TABLE `common_code` (
  `code_seq` int NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `code_order` int NOT NULL,
  `reg_dt` DATETIME NOT NULL,
  `mod_dt` DATETIME NOT NULL,
  `del_dt` DATETIME NULL,
  PRIMARY KEY (`code_seq`),
  UNIQUE KEY `code_seq_UNIQUE` (`code_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 아티스트 테이블
CREATE TABLE `artist` (
  `artist_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `code_seq` int NOT NULL,
  `artist_description` varchar(1000) DEFAULT NULL,
  `artist_sns` varchar(100) DEFAULT NULL,
  `artist_followers_total` int NOT NULL DEFAULT '0' COMMENT 'update',
  `reg_dt` DATETIME NOT NULL,
  `mod_dt` DATETIME NOT NULL,
  `del_dt` DATETIME NULL,
  PRIMARY KEY (`artist_seq`),
  UNIQUE KEY `artist_seq_UNIQUE` (`artist_seq`),
  UNIQUE KEY `user_seq_UNIQUE` (`user_seq`),
  KEY `user_artist_fk_idx` (`user_seq`),
  KEY `common_code_fk_idx` (`code_seq`),
  CONSTRAINT `common_code_fk` FOREIGN KEY (`code_seq`) REFERENCES `common_code` (`code_seq`),
  CONSTRAINT `user_artist_fk` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 신고 테이블
CREATE TABLE `report` (
  `report_seq` bigint NOT NULL AUTO_INCREMENT,
  `artist_seq` int NOT NULL,
  `user_seq` int NOT NULL,
  `reg_dt` DATETIME NOT NULL,
  `mod_dt` DATETIME NOT NULL,
  `del_dt` DATETIME NULL,
  PRIMARY KEY (`report_seq`),
  UNIQUE KEY `report_seq_UNIQUE` (`report_seq`),
  KEY `artist_report_fk_idx` (`artist_seq`),
  KEY `user_report_fk_idx` (`user_seq`),
  CONSTRAINT `artist_report_fk` FOREIGN KEY (`artist_seq`) REFERENCES `artist` (`artist_seq`),
  CONSTRAINT `user_report_fk` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 팔로우 테이블
CREATE TABLE `follow` (
  `follow_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_to` int NOT NULL,
  `user_from` int NOT NULL,
  `reg_dt` DATETIME NOT NULL,
  `mod_dt` DATETIME NOT NULL,
  `del_dt` DATETIME NULL,
  PRIMARY KEY (`follow_seq`),
  UNIQUE KEY `follow_seq_UNIQUE` (`follow_seq`),
  KEY `user_follow_fk_idx` (`user_to`),
  KEY `user_follow_fk_idx1` (`user_from`),
  CONSTRAINT `user_follow_fk` FOREIGN KEY (`user_to`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 알림 테이블
CREATE TABLE `notification` (
  `notification_seq` bigint NOT NULL AUTO_INCREMENT,
  `notification_receiver` int NOT NULL,
  `notification_sender` bigint NOT NULL,
  `notification_type` int NOT NULL,
  `notification_content` varchar(50) NOT NULL,
  `notification_check_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_dt` DATETIME NOT NULL,
  `mod_dt` DATETIME NOT NULL,
  `del_dt` DATETIME NULL,
  PRIMARY KEY (`notification_seq`),
  UNIQUE KEY `notification_seq_UNIQUE` (`notification_seq`),
  KEY `user_notification_fk_idx` (`notification_receiver`),
  CONSTRAINT `user_notification_fk` FOREIGN KEY (`notification_receiver`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 에디션 테이블
CREATE TABLE `edition` (
  `edition_seq` bigint NOT NULL AUTO_INCREMENT,
  `artist_seq` int NOT NULL,
  `edition_name` varchar(50) NOT NULL,
  `edition_image` varchar(100) NOT NULL,
  `edition_description` varchar(1000) NOT NULL,
  `edition_royalty` double NOT NULL,
  `reg_dt` DATETIME NOT NULL,
  PRIMARY KEY (`edition_seq`),
  UNIQUE KEY `edition_seq_UNIQUE` (`edition_seq`),
  KEY `artist_edition_fk_idx` (`artist_seq`),
  CONSTRAINT `artist_edition_fk` FOREIGN KEY (`artist_seq`) REFERENCES `artist` (`artist_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- nft 테이블
CREATE TABLE `nft` (
  `nft_seq` bigint NOT NULL AUTO_INCREMENT,
  `edition_seq` bigint NOT NULL,
  `nft_author_seq` int NOT NULL COMMENT '아티스트 번호',
  `nft_owner_seq` int NOT NULL,
  `nft_num` int NOT NULL COMMENT '에디션 내부에서 번호',
  `nft_id` varchar(50) NOT NULL COMMENT '이더리움 상의 id',
  `nft_transaction_id` varchar(200) NOT NULL,
  `nft_transaction_count` int NOT NULL,
  `nft_volume` varchar(45) NOT NULL,
  `reg_dt` datetime NOT NULL,
  `mod_dt` datetime NOT NULL,
  `del_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`nft_seq`),
  UNIQUE KEY `nft_seq_UNIQUE` (`nft_seq`),
  KEY `edition_nft_fk_idx` (`edition_seq`),
  KEY `edition_nft_fk_idx1` (`nft_author_seq`),
  KEY `user_nft_fk_idx` (`nft_owner_seq`),
  CONSTRAINT `edition_nft_fk` FOREIGN KEY (`edition_seq`) REFERENCES `edition` (`edition_seq`),
  CONSTRAINT `user_nft_fk` FOREIGN KEY (`nft_owner_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- nft 정렬 기준 테이블
CREATE TABLE `nft_sorting` (
  `nft_sorting_seq` bigint NOT NULL AUTO_INCREMENT,
  `nft_seq` bigint NOT NULL,
  `nft_sorting_transaction_count` int NOT NULL DEFAULT '0',
  `nft_sorting_volume` double NOT NULL,
  `nft_sorting_latest` double NOT NULL,
  `nft_sorting_hearts` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`nft_sorting_seq`),
  UNIQUE KEY `nft_sorting_seq_UNIQUE` (`nft_sorting_seq`),
  KEY `nft_nft_sorting_fk_idx` (`nft_seq`),
  CONSTRAINT `nft_nft_sorting_fk` FOREIGN KEY (`nft_seq`) REFERENCES `nft` (`nft_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 좋아요 테이블
CREATE TABLE `heart` (
  `heart_seq` bigint NOT NULL AUTO_INCREMENT,
  `nft_seq` bigint NOT NULL,
  `user_seq` int NOT NULL,
  `reg_dt` DATETIME NOT NULL,
  `mod_dt` DATETIME NOT NULL,
  `del_dt` DATETIME NULL,
  PRIMARY KEY (`heart_seq`),
  UNIQUE KEY `heart_seq_UNIQUE` (`heart_seq`),
  KEY `nft_heart_fk_idx` (`nft_seq`),
  KEY `user_heart_fk_idx` (`user_seq`),
  CONSTRAINT `nft_heart_fk` FOREIGN KEY (`nft_seq`) REFERENCES `nft` (`nft_seq`),
  CONSTRAINT `user_heart_fk` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 판매 테이블
CREATE TABLE `sale` (
  `sale_seq` bigint NOT NULL AUTO_INCREMENT,
  `nft_seq` bigint NOT NULL,
  `sale_price` double NOT NULL,
  `reg_dt` DATETIME NOT NULL,
  `mod_dt` DATETIME NOT NULL,
  `del_dt` DATETIME NULL,
  PRIMARY KEY (`sale_seq`),
  UNIQUE KEY `sale_seq_UNIQUE` (`sale_seq`),
  KEY `nft_sale_fk_idx` (`nft_seq`),
  CONSTRAINT `nft_sale_fk` FOREIGN KEY (`nft_seq`) REFERENCES `nft` (`nft_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 흥정 테이블
CREATE TABLE `bid` (
  `bid_seq` bigint NOT NULL AUTO_INCREMENT,
  `sale_seq` bigint NOT NULL,
  `buyer_seq` int NOT NULL,
  `seller_seq` int NOT NULL,
  `bid_price` double NOT NULL,
  `bid_accepted_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_dt` DATETIME NOT NULL,
  `mod_dt` DATETIME NOT NULL,
  `del_dt` DATETIME NULL,
  PRIMARY KEY (`bid_seq`),
  UNIQUE KEY `bid_seq_UNIQUE` (`bid_seq`),
  KEY `sale_bid_fk_idx` (`sale_seq`),
  KEY `user_bid_fk_idx` (`buyer_seq`),
  KEY `user_bid_fk_idx1` (`seller_seq`),
  CONSTRAINT `sale_bid_fk` FOREIGN KEY (`sale_seq`) REFERENCES `sale` (`sale_seq`),
  CONSTRAINT `user_bid_fk` FOREIGN KEY (`buyer_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

alter table artist auto_increment=1;
alter table bid auto_increment=1;
alter table common_code auto_increment=1;
alter table edition auto_increment=1;
alter table follow auto_increment=1;
alter table heart auto_increment=1;
alter table nft auto_increment=1;
alter table nft_sorting auto_increment=1;
alter table notification auto_increment=1;
alter table report auto_increment=1;
alter table sale auto_increment=1;
alter table user auto_increment=1;
