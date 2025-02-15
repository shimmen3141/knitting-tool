export const STITCH_TYPE_KEYS = [
  "magicRing",
  "chain",
  "inc",
  "dec",
  "single",
  "halfDouble",
  "double",
  "treble",
  "slip",
] as const;

export type Stitch = {
  type: (typeof STITCH_TYPE_KEYS)[number];
  x: number;
  y: number;
  r?: number;
  label?: string;
  rotation?: number;
};

export type StitchShapeProps = {
  type: Stitch["type"];
  x: Stitch["x"];
  y: Stitch["y"];
  rotation?: Stitch["rotation"];
  index: number;
  judgeIsSelected: (index: number) => boolean;
  handleColor: (index: number) => void;
};
