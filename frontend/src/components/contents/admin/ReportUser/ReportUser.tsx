import { Popconfirm, message, Space } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect } from "react";
import { adminState } from "../../../../recoil/admin";
import { useRecoilState } from "recoil";
import Column from "antd/lib/table/Column";
import LetterBox from "../../../containers/letterBox/LetterBox";
import { ReportUserDiv, TableDiv } from "./ReportUser.styled";

interface ReportUser {
  userNickname: any;
}

export const ReportUser = () => {
  const [adminStateVal, setAdminStateVal] = useRecoilState(adminState);

  const DeleteReport = () => {
    message.success("해당 신고가 삭제되었습니다.");
  };

  const DeleteArtist = () => {
    message.error("해당 아티스트의 권한이 삭제되었습니다.");
  };

  const CheckReportUser = () => {
    axios({
      method: "GET",
      url: "http://j6a105.p.ssafy.io:8080/api/admin/report",
    }).then(function (res) {
      setAdminStateVal({
        ...adminStateVal,
        reportUserList: res.data.success,
      });
      console.log(adminStateVal.reportUserList);
    });
  };

  useEffect(() => {
    CheckReportUser();
  }, []);

  return (
    <ReportUserDiv>
      <LetterBox size="h1">신고 관리하기</LetterBox>
      <TableDiv dataSource={adminStateVal.reportUserList}>
        <Column
          title="아티스트 명"
          dataIndex="userNickname"
          key="userNickname"
        ></Column>
        <Column
          title="누적 신고 횟수"
          dataIndex="reporterSeq"
          key="reporterSeq"
        ></Column>
        <Column
          title="아티스트 등록 일자"
          dataIndex="artistSeq"
          key="artistSeq"
        ></Column>
        <Column
          title="관리"
          key="admin"
          render={() => (
            <Space size="middle">
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
            </Space>
          )}
        />
      </TableDiv>
    </ReportUserDiv>
  );
};
