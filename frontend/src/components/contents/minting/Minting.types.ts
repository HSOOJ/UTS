import { type } from "os";
import { FieldError } from "react-hook-form";

export interface IMinting {
  userSeq: string;
  editionName: string;
  editionImage: File;
  editionImageUrl: string;
  editionDescription: string;
  editionRoyalty: number;
  editionTotal: number;
  salePrice: number;
}

type OmitIminting = Omit<IMinting, "editionImage" | "editionImageUrl">;

export interface IMintingBE extends OmitIminting {
  editionImage: string;
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
