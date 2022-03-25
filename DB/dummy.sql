use uts;

-- user
-- desc user;
insert into user values (0, '유싸피', '0x123345', 'img', 0, now(), now(), null);
insert into user values (0, '아티스트', '0x65431', 'artist-img', 1, now(), now(), null);
insert into user values (0, '관리자', '0x1253e', 'admin-img', 2, now(), now(), null);
insert into user values (0, '가짜 아티스트', '0xabd', 'art.png', 1, now(), now(), null);
insert into user values (0, '김싸피', '0x64241', 'img2', 0, now(), now(), null);
insert into user values (0, '아이유', '0x123123', 'iu-image', 1, now(), now(), null);
insert into user values (0, '지드래곤', '0x1231234', 'gdragon-image', 1, now(), now(), null);
insert into user values (0, '태양', '0x12312345', 'taeyang-image', 1, now(), now(), null);
select * from user;

-- common_code
-- desc common_code;
insert into common_code values (0, '뮤지션', 1, now(), now(), null);
insert into common_code values (0, '작가', 2, now(), now(), null);
insert into common_code values (0, '운동선수', 3, now(), now(), null);
insert into common_code values (0, '배우', 4, now(), now(), null);
insert into common_code values (0, '패션', 5, now(), now(), null);
insert into common_code values (0, '크리에이터', 6, now(), now(), null);
insert into common_code values (0, '기타', 7, now(), now(), null);
select * from common_code;

-- artist
desc artist;
insert into artist values(0, 2, 2, "나는 웹툰 작가", "", 0, now(), now(), null);
insert into artist values(0, 4, 1, "나는 뮤지션", "", 0, now(), now(), null);
insert into artist values (0, 1, 1, '뮤지션의 설명입니다', '아티스트의 sns 주소@instagram', 1, now(), now(), null);
select * from artist;

-- report
desc report;
insert into report values(0, 2, 5, now(), now(), null);
select * from report;

-- follow
desc follow;
insert into follow values(0, 1, 5, now(), now(), null);
insert into follow values(0, 1, 1, now(), now(), null);
select * from follow;

-- notification
desc notification;
insert into notification values(0, 2, 1, 0, "알림 테스트", 'n', now(), now(), null);
select * from notification;

-- edition
desc edition;
insert into edition values(0, 2, "1기", "사진", "첫번째 에디션", 0.1, now());
select * from edition;

-- nft
desc nft;
insert into nft values(0, 1, 2, 2, 1, "id", "transaction", now(), now(), null);
insert into nft values(0, 1, 2, 2, 2, "id", "transaction", now(), now(), null);
insert into nft values(0, 1, 2, 2, 3, "nft-id", "transaction-id", now(), now(), null);
insert into nft values(0, 1, 2, 2, 3, "nft-id", "transaction-id", now(), now(), now());
insert into nft values(0, 1, 2, 5, 3, "nft-id", "transaction-id", now(), now(), null);
select * from nft;

-- nft_sorting
desc nft_sorting;
insert into nft_sorting values(0, 1, 1, 100, 100, 2); 
insert into nft_sorting values(0, 2, 1, 99, 99, 0); 
select * from nft_sorting;

-- heart
desc heart;
insert into heart values(0, 1, 5, now(), now(), null);
insert into heart values(0, 1, 1, now(), now(), null);
select * from heart;

-- sale
desc sale;
insert into sale values(0, 1, 100, now(), now(), null);
insert into sale values(0, 2, 100, now(), now(), null);
insert into sale values (0, 3, 1.157, now(), now(), null);
insert into sale values (0, 3, 1.157, now(), now(), now());
insert into sale values (0, 5, 3.5, now(), now(), null);
select * from sale;

-- bid
desc bid;
insert into bid values(0, 2, 5, 2, 99, 'y', now(), now(), null);
select * from bid; 