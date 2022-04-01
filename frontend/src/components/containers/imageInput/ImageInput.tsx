import { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "../../../foundation/Icon/Icon";
import Image from "../Image/Image";
import LetterBox from "../letterBox/LetterBox";
import {
  Description,
  ErrorLayOut,
  errVariants,
  LayOut,
  Title,
} from "./ImageInput.styled";
import { IImageInput } from "./ImageInput.types";

export const ImageInput = ({
  isDark,
  errMessage,
  title,
  onChange,
}: IImageInput) => {
  const defaultDesc = "Click here or Drag & Drop";
  const [desc, setDesc] = useState(defaultDesc);
  const [imgSrc, setImgSrc] = useState("");

  const readFile = (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => resolve(reader.result as string),
        false
      );
      reader.readAsDataURL(file);
    });
  };

  const isSrcImage = (src: string) => {
    return src.split("/")[0] === "data:image";
  };

  return (
    <Dropzone
      onDragEnter={() => setDesc("Leave your file here")}
      onDragLeave={() => setDesc(defaultDesc)}
      onDrop={async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const src = await readFile(file);

        setImgSrc(src);
        console.log(src);
        onChange(file);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <LayOut errMessage={errMessage} isDark={isDark} {...getRootProps()}>
          <input {...getInputProps()} type="file" accept="image/*" />
          {imgSrc ? (
            isSrcImage(imgSrc) ? (
              <Image width="180px" height="180px" shape="round" src={imgSrc} />
            ) : (
              <>
                <LetterBox size="h1" weight="bold" color="primary">
                  😭
                </LetterBox>
                <LetterBox size="body2" weight="bold" color="shade">
                  이미지 파일이 아닌거 같아요
                </LetterBox>
              </>
            )
          ) : (
            <Icon
              size={36}
              name="image"
              color={isDark ? "shade" : "primary"}
            ></Icon>
          )}
          <Title>{title}</Title>
          {errMessage && (
            <ErrorLayOut
              key={errMessage}
              variants={errVariants}
              initial="initial"
              animate="entry"
              exit="exit"
            >
              <LetterBox size="body2">{errMessage}</LetterBox>
            </ErrorLayOut>
          )}
          <Description>{desc}</Description>
        </LayOut>
      )}
    </Dropzone>
    // <Dropzone
    //   onDrop={(acceptedFiles) => {
    //     props.onChange(acceptedFiles);
    //   }}
    //   ref={imgRef}
    // >
    //   {({ getRootProps, getInputProps }) => (
    //     <Layout {...getRootProps()} {...props}>
    //       <input {...getInputProps()} type="file" accept="image/*" />
    //       <Icon icon="image" />
    //       <Title>이미지를 업로드하세요</Title>
    //       <Description>
    //         여기를 클릭하거나 파일을 마우스로 끌어보세요.
    //       </Description>
    //     </Layout>
    //   )}
    // </Dropzone>
  );
};
