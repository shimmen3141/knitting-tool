export const STITCH_TYPE_KEYS = [
  "magicRing",
  "chain",
  "inc",
  "dec",
  "single",
  "halfDouble",
  "double",
  "treble",
];

export type Stitch = {
  type: (typeof STITCH_TYPE_KEYS)[number];
  x: number;
  y: number;
  r?: number;
  label?: string;
  rotation?: number;
};
