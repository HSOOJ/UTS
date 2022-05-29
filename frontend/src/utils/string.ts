import _ from "lodash";

export const shortenString = (text: string, range: number) => {
  let ellipsis = "";
  if (text.length > range) {
    ellipsis = "...";
  }
  return text.slice(0, range) + ellipsis;
};

export const camelToTitle = (text: string) => {
  return _.startCase(text);
};
