import { Stitch } from "../components/Stitch.types";

export const getRotation = (list: Stitch[]) => {
  //鎖編みの連続をひとまとまりとして要素数を算出
  let isPrevChain = false;
  const chainCount = list.reduce((acc, cur) => {
    if (cur.type === "chain") {
      if (isPrevChain) {
        return acc;
      }
      isPrevChain = true;
      return acc + 1;
    }
    if (cur.type === "slip") {
      isPrevChain = false;
      return acc;
    }
    isPrevChain = false;
    return acc + 1;
  }, 0);

  return 360 / chainCount;
};
