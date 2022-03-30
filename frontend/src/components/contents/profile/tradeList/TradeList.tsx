import { Avatar, List } from "antd";
import { useEffect, useState } from "react";
import VirtualList from "rc-virtual-list";
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
