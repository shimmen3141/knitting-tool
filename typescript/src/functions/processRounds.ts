import { Stitch } from "../components/Stitch.types";
import { getRotation } from "./getRotation";

export const processRounds = (rounds: Stitch[][]) => {
  const MARGIN = 5;
  // 処理後の rounds を格納する配列
  const processedRounds: Stitch[][] = [];
  processedRounds[0] = rounds[0];

  const rotation = getRotation(rounds[1]);

  // 最初の round の各オブジェクトに初期値を付与
  processedRounds[1] = rounds[1]
    .map((stitch) => ({
      ...stitch,
      height: typeToHeight[stitch.type] || 0,
      rotation: (stitch.index ?? 0) * rotation,
    }))
    .map((stitch) => ({
      ...stitch,
      x: (30 + MARGIN) * Math.cos(((stitch.rotation! + 90) * Math.PI) / 180),
      y: (30 + MARGIN) * Math.sin(((stitch.rotation! + 90) * Math.PI) / 180),
    }));

    console.log(processedRounds[1]);

  // 2回目以降の round を順次処理
  for (let i = 2; i < rounds.length; i++) {
    // 前の round の処理済みデータ
    const prevRound = processedRounds[i - 1];
    // 現在の round を処理
    processedRounds[i] = rounds[i].map((stitch) => {
      const sourceIndex = (stitch.relativeTo || stitch.index) ?? 0;
      const prevStitch = prevRound[sourceIndex];

      return {
        ...stitch,
        height: typeToHeight[stitch.type] || 0,
        rotation: prevStitch.rotation,
        x:
          prevStitch.x! +
          (prevStitch.height! + MARGIN) *
            Math.cos(((prevStitch.rotation! + 90) * Math.PI) / 180),
        y:
          prevStitch.y! +
          (prevStitch.height! + MARGIN) *
            Math.sin(((prevStitch.rotation! + 90) * Math.PI) / 180),
      };
    });
  }
  return processedRounds;
};

const typeToHeight: Record<string, number> = {
  "magicRing": 30,
  "chain": 20,
  "inc": 20,
  "dec": 20,
  "single": 20,
  "halfDouble": 30,
  "double": 40,
  "treble": 50,
  "slip": 0,
};
