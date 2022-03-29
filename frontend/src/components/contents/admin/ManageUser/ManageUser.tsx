import { Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export const ManageUser = () => {
  const AddArtist = () => {
    message.success("해당 유저는 아티스트 권한을 부여받았습니다.");
  };

  const DeleteArtist = () => {
    message.error("해당 아티스트의 권한이 삭제되었습니다.");
  };

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
      <Popconfirm
        title="해당 아티스트에 권한을 부여하시겠습니까?"
        onConfirm={AddArtist}
      >
        <button>아티스트 등록하기</button>
      </Popconfirm>
      <Popconfirm
        title="해당 아티스트의 권한을 삭제하시겠습니까?"
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        onConfirm={DeleteArtist}
      >
        <button>아티스트 취소하기</button>
      </Popconfirm>
    </div>
  );
};
