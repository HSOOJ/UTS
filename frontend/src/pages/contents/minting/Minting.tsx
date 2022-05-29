import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../../components/containers/button";
import LetterBox from "../../../components/containers/letterBox/LetterBox";
import { Mint } from "../../../components/contents/minting";
import { IMinting } from "../../../components/contents/minting/Minting.types";
import PublishBox from "../../../components/contents/minting/publishingBox";
import Title from "../../../components/contents/minting/title";

export const Minting = () => {
  const forms = useForm<IMinting>();

  return (
    <PageLayOut>
      <FormProvider {...forms}>
        <Mint handleSubmit={forms.handleSubmit}>
          <Title />
          <PublishBox />
          <Button styleVariant="primary">
            <LetterBox size="h3" weight="bold">
              Create Badge
            </LetterBox>
          </Button>
        </Mint>
      </FormProvider>
    </PageLayOut>
  );
};

const PageLayOut = styled.div`
  display: flex;
  justify-content: center;
`;
