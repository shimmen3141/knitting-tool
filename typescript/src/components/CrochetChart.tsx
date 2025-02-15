import { Stage, Layer } from "react-konva";
import StitchShape from "./StitchShape";
import { STITCH_TYPE_KEYS } from "./Stitch.types";

const stitches: {
  type: string;
  x: number;
  y: number;
  r?: number;
  label?: string;
  rotation?: number;
}[] = [
  // マジックリング（○）
  { type: "magicRing", x: 0, y: 0, r: 30, label: "わ" },
  // 鎖編み（○）
  { type: "chain", x: 0, y: -60 },
  { type: "chain", x: 0, y: -80 },
  { type: "chain", x: 0, y: -100 },
  { type: "chain", x: 0, y: -120 },
  { type: "chain", x: 0, y: -140 },
  // 細編み（×）
  { type: "single", x: 30, y: -40 },
  { type: "single", x: -30, y: -40 },
  // 増し目
  { type: "inc", x: 60, y: -20 },
  { type: "inc", x: -60, y: -20 },
  // 減らし目
  { type: "dec", x: 90, y: 10 },
  { type: "dec", x: -90, y: 10 },
  // 長編み（T）
  { type: "halfDouble", x: 0, y: 50, rotation: 180 },
  { type: "treble", x: 20, y: 70 },
  { type: "treble", x: -20, y: 70 },
  { type: "double", x: 40, y: 90 },
  { type: "double", x: -40, y: 90, rotation: 90 },
  { type: "double", x: 60, y: 110, rotation: -90 },
  { type: "double", x: -60, y: 110 },
  // 引き抜き編み（・）
  { type: "slip", x: 0, y: -160 },
];

const CrochetChart = () => {
  return (
    <Stage width={500} height={500} offsetX={-250} offsetY={-250}>
      <Layer>
        {stitches.map((stitch, index) => {
          // if (stitch.type === "circle") {
          //   return (
          //     <Circle
          //       key={index}
          //       x={stitch.x}
          //       y={stitch.y}
          //       radius={stitch.r}
          //       stroke="black"
          //       fill="none"
          //     />
          //   );
          // }
          if (
            stitch.type === "magicRing" ||
            stitch.type === "chain" ||
            stitch.type === "inc" ||
            stitch.type === "dec" ||
            stitch.type === "single" ||
            stitch.type === "halfDouble" ||
            stitch.type === "double" ||
            stitch.type === "treble"
          ) {
            return (
              <StitchShape
                key={index}
                type={stitch.type}
                x={stitch.x}
                y={stitch.y}
                rotation={stitch.rotation || 0}
              />
            );
          }
          throw new Error("Invalid stitch type");
          return null;
        })}
      </Layer>
    </Stage>
  );
};

export default CrochetChart;
