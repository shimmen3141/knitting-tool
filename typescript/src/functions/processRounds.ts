import { Stitch } from "../components/Stitch.types";
import { getRotation } from "./getRotation";
import { addRelations } from "./addRelations";

export const processRounds = (rounds: Stitch[][]) => {
  const MARGIN = 5;
  const MAGIC_RING_RADIUS = typeToHeight["magicRing"];

  // 最初の要素のtypeが"magicRing"であるかをチェック
  if (rounds[0][0].type === "magicRing") {
    rounds[0][0] = { ...rounds[0][0], x: 0, y: 0 };
  } else {
    console.error(
      'The first element of the first round must be of type "magicRing".'
    );
  }

  // relativeToを追加
  rounds = addRelations(rounds);

  // 処理後の rounds を格納する配列
  const processedRounds: Stitch[][] = [];
  // magicRingを格納
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
      x:
        (MAGIC_RING_RADIUS + MARGIN) *
        Math.cos(((stitch.rotation + 90) * Math.PI) / 180),
      y:
        (MAGIC_RING_RADIUS + MARGIN) *
        Math.sin(((stitch.rotation + 90) * Math.PI) / 180),
    }));

  // 2回目以降の round を順次処理
  for (let i = 2; i < rounds.length; i++) {
    // 前の round の処理済みデータ
    const prevRound: Stitch[] = processedRounds[i - 1];

    // relativeToが等しい要素の個数をカウント
    const relativeToCount: Record<number, number> = {};
    rounds[i].forEach((stitch) => {
      const relativeTo = stitch.relativeTo ?? stitch.index ?? 0;
      if (relativeToCount[relativeTo] === undefined) {
        relativeToCount[relativeTo] = 0;
      }
      relativeToCount[relativeTo]++;
    });

    const relativeToIndex: Record<number, number> = {};

    // 現在の round を処理
    processedRounds[i] = rounds[i].map((stitch) => {
      const sourceIndex = (stitch.relativeTo || stitch.index) ?? 0;
      const prevStitch: Stitch = prevRound[sourceIndex];

      // relativeToが重なったときの処理
      if (relativeToIndex[sourceIndex] === undefined) {
        relativeToIndex[sourceIndex] = 0;
      }
      const currentIndex = relativeToIndex[sourceIndex]++;
      const totalRelativeToCount = relativeToCount[sourceIndex];

      const updatedRotation =
        totalRelativeToCount > 1
          ? (prevStitch.rotation ?? 0) -
            90 +
            (180 * (currentIndex + 1)) / (totalRelativeToCount + 1)
          : prevStitch.rotation;

      return {
        ...stitch,
        height: typeToHeight[stitch.type] || 0,
        rotation: updatedRotation,
        x:
          (prevStitch.x ?? 0) +
          ((prevStitch.height ?? 0) + MARGIN) *
            Math.cos((((prevStitch.rotation ?? 0) + 90) * Math.PI) / 180),
        y:
          (prevStitch.y ?? 0) +
          ((prevStitch.height ?? 0) + MARGIN) *
            Math.sin((((prevStitch.rotation ?? 0) + 90) * Math.PI) / 180),
      };
    });
  }
  return processedRounds;
};

const typeToHeight: Record<string, number> = {
  magicRing: 30,
  chain: 20,
  inc: 20,
  dec: 20,
  single: 20,
  halfDouble: 30,
  double: 40,
  treble: 50,
  slip: 0,
};
