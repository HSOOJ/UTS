import { Avatar, List } from "antd";
import { useEffect, useState } from "react";
import VirtualList from "rc-virtual-list";

const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 400;

export const TradeList = () => {
  // useState
  const [data, setData] = useState([]);

  // fetch
  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
      });
  };

  // function
  const onScroll = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  // useEffect
  useEffect(() => {
    appendData();
  }, []);

  return (
    <>
      <h1>Trade List</h1>
      <List>
        <VirtualList
          data={data}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="email"
          onScroll={onScroll}
        >
          {(item: any) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </>
  );
};
