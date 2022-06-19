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
  onConfirm: () => void;
}

export const ReportUser = () => {
  const [adminStateVal, setAdminStateVal] = useRecoilState(adminState);

  const DeleteReport = (idx: any) => {
    axios({
      method: "PUT",
      url: "http://uts_url:8080/api/admin/report/cancel",
      data: { reportSeq: idx.reportSeq },
    }).then(function () {
      message.success("해당 신고가 삭제되었습니다.");
    });
  };

  const DeleteArtist = (idx: any) => {
    axios({
      method: "PUT",
      url: "http://uts_url:8080/api/admin/artist/cancel",
      data: { userSeq: idx.userSeq, artistSeq: idx.artistSeq },
    }).then(function () {
      message.error("해당 아티스트의 권한이 삭제되었습니다.");
    });
  };

  const CheckReportUser = () => {
    axios({
      method: "GET",
      url: "http://uts_url:8080/api/admin/report",
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
          title="신고 번호"
          dataIndex="reportSeq"
          key="reportSeq"
        ></Column>
        <Column
          title="아티스트 명"
          dataIndex="userNickname"
          key="userNickname"
        ></Column>
        <Column
          title="신고자 번호"
          dataIndex="reporterSeq"
          key="reporterSeq"
        ></Column>
        <Column
          title="관리"
          key="admin"
          render={(idx) => (
            <Space size="middle">
              <Popconfirm
                title="해당 아티스트의 권한을 삭제하시겠습니까?"
                onConfirm={() => DeleteArtist(idx)}
              >
                <button>아티스트 취소</button>
              </Popconfirm>
              <Popconfirm
                title="해당 신고를 삭제하시겠습니까?"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => DeleteReport(idx)}
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
