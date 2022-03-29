import { Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export const ReportUser = () => {
  const DeleteReport = () => {
    message.success("해당 신고가 삭제되었습니다.");
  };

  const DeleteArtist = () => {
    message.error("해당 아티스트의 권한이 삭제되었습니다.");
  };

  return (
    <div>
      <h1>신고 관리하기</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>아티스트 명</th>
              <th>누적 신고 횟수</th>
              <th>아티스트 등록 일자</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>고양이 키우고 싶다</td>
              <td>14회</td>
              <td>2022.03.19</td>
              <td>
                <Popconfirm
                  title="해당 아티스트의 권한을 삭제하시겠습니까?"
                  onConfirm={DeleteArtist}
                >
                  <button>아티스트 취소</button>
                </Popconfirm>
                <Popconfirm
                  title="해당 신고를 삭제하시겠습니까?"
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  onConfirm={DeleteReport}
                >
                  <button>잘못된 신고</button>
                </Popconfirm>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
