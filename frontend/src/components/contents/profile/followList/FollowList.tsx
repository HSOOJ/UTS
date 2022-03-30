import { Avatar, List } from "antd";
import { useEffect, useState } from "react";
import VirtualList from "rc-virtual-list";
import { FollowListCompo } from "./FollowListCompo";

export const FollowList = () => {
  // useState
  const [data, setData] = useState([]);

  return (
    <>
      <FollowListCompo />
      <FollowListCompo />
      <FollowListCompo />
      <FollowListCompo />
    </>
  );
};
