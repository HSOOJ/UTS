import { useState } from "react";
import { TradeListCompo } from "./TradeListCompo";

export const TradeList = () => {
  // useState
  const [data, setData] = useState([]);

  return (
    <>
      <TradeListCompo />
      <TradeListCompo />
      <TradeListCompo />
      <TradeListCompo />
    </>
  );
};
