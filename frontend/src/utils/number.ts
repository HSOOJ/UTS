export const milion = 1000000;
export const thousand = 1000;

export const shortenNumber = (num: number) => {
  if (num > milion) {
    return (num / milion).toFixed(1) + "M";
  }
  if (num > thousand) {
    return (num / thousand).toFixed(1) + "K";
  }
  return num + "";
};
