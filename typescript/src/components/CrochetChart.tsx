import  { useState } from "react";
import { Stage, Layer } from "react-konva";
import StitchShape from "./StitchShape";
import { Stitch } from "./Stitch.types";

const stitches: Stitch[] = [
  // マジックリング（○）
  { type: "magicRing", x: 0, y: 0, r: 30, label: "わ" },
  // 鎖編み（○）
  { type: "chain", x: 0, y: 30 },
  { type: "chain", x: 0, y: 50 },
  { type: "chain", x: 0, y: 70 },
  { type: "chain", x: 0, y: 90 },
  { type: "chain", x: 0, y: 110 },
  // 細編み（×）
  { type: "single", x: 90 / 1.414, y: -90 / 1.414, rotation: -135 },
  { type: "single", x: -90 / 1.414, y: -90 / 1.414, rotation: 135 },
  // 増し目
  { type: "inc", x: 80 / 1.414, y: 80 / 1.414, rotation: -45 },
  { type: "inc", x: -80 / 1.414, y: 80 / 1.414, rotation: 45 },
  // 減らし目
  { type: "dec", x: 80, y: 0, rotation: -90 },
  { type: "dec", x: -80, y: 0, rotation: 90 },
  // 長編み（T）
  { type: "halfDouble", x: 0, y: -30, rotation: 180 },
  { type: "treble", x: 30 / 1.414, y: -30 / 1.414, rotation: -135 },
  { type: "treble", x: -30 / 1.414, y: -30 / 1.414, rotation: 135 },
  { type: "double", x: 30 / 1.414, y: 30 / 1.414, rotation: -45 },
  { type: "double", x: -30, y: 0, rotation: 90 },
  { type: "double", x: 30, y: 0, rotation: -90 },
  { type: "double", x: -30 / 1.414, y: 30 / 1.414, rotation: 45 },
  // 引き抜き編み（・）
  // { type: "slip", x: 0, y: -160 },
];

const CrochetChart = () => {
  const [shapeSelectedState, setShapeSelectedState] = useState({
    index: 0,
    isSelected: false,
  });
  const judgeIsSelected = (index: number) =>
    shapeSelectedState.index === index && shapeSelectedState.isSelected;
  const handleColor = (index: number) => {
    if (judgeIsSelected(index)) {
      setShapeSelectedState({ index, isSelected: false });
      return;
    }
    setShapeSelectedState({ index, isSelected: true });
    return;
  };

  return (
    <Stage width={500} height={500} offsetX={-250} offsetY={250} scaleY={-1}>
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
          return (
            <StitchShape
              type={stitch.type}
              x={stitch.x}
              y={stitch.y}
              rotation={stitch.rotation || 0}
              index={index}
              judgeIsSelected={judgeIsSelected}
              handleColor={handleColor}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default CrochetChart;
