export const ManageUser = () => {
  return (
    <div>
      <h1>회원 관리하기</h1>
      <form action="#">
        <input type="text" placeholder="회원님의 지갑 주소를 입력해주세요" />
        <button type="submit">검색</button>
      </form>
      <div>
        <p>회원명: 현정짱짱</p>
        <p>일반유저입니다. </p>
      </div>
      <button>아티스트 등록하기</button>
      <button>아티스트 취소하기</button>
    </div>
  );
};
