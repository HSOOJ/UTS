import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  // useNavigate
  let navigate = useNavigate();

  return (
    <Result
      status="404"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default Page404;
