import { FieldError } from "react-hook-form";

export interface IMinting {
  userSeq: string;
  editionName: string;
  editionImage: File;
  editionDescription: string;
  editionRoyalty: number;
  editionTotal: number;
  salePrice: number;
}

export interface IMintingBE extends IMinting {
  nftId: string;
  nftTransactionId: string;
}

export interface IMintingErrors {
  userSeq?: FieldError | undefined;
  editionName?: FieldError | undefined;
  editionImage?: FieldError | undefined;
  editionDescription?: FieldError | undefined;
  editionRoyalty?: FieldError | undefined;
  editionTotal?: FieldError | undefined;
  salePrice?: FieldError | undefined;
}
