import { Image } from "antd";

export const ModifyModalPic = () => {
  // click button
  const clickModalModifyPic = () => {
    console.log("modify profile pic");
  };

  return (
    <>
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
        preview={{
          src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        }}
      />
      <button onClick={clickModalModifyPic}>프로필 사진 수정</button>
    </>
  );
};
