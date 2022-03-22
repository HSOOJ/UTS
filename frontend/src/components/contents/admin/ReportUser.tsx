export const ReportUser = () => {
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
              <td>나는 현정이</td>
              <td>3회</td>
              <td>2022.03.21</td>
              <td>
                <button>아티스트 취소</button>
                <button>잘못된 신고</button>
              </td>
            </tr>
            <tr>
              <td>고양이 키우고 싶다</td>
              <td>14회</td>
              <td>2022.03.19</td>
              <td>
                <button>아티스트 취소</button>
                <button>잘못된 신고</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
