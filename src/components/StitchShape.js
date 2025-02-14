import React, { useState } from "react";
import { Shape } from "react-konva";

function drawSingle(ctx) {
  // × の形
  ctx.moveTo(-10, -10);
  ctx.lineTo(10, 10);
  ctx.moveTo(10, -10);
  ctx.lineTo(-10, 10);
}

function drawDouble(ctx) {
  // T の形
  ctx.moveTo(-10, 0);
  ctx.lineTo(10, 0);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 20);
}

const StitchShape = ({ type, x, y }) => {
    const [isHovered, setIsHovered] = useState(false);

  return (
    <Shape
      x={x}
      y={y}
      sceneFunc={(ctx, shape) => {
        ctx.beginPath();
        if (type === "single") {
          drawSingle(ctx);
        } else if (type === "double") {
          drawDouble(ctx);
        }
        ctx.strokeShape(shape);
      }}
      stroke={isHovered ? "red" : "black"} // カーソルが入ったら色を変える
      strokeWidth={isHovered ? 2 : 1} // カーソルが入ったら太さを変える
      hitStrokeWidth={10}
      onClick={() => alert(type)}
      onMouseEnter={() => setIsHovered(true)} // カーソルが入ったとき
      onMouseLeave={() => setIsHovered(false)} // カーソルが出たとき
    />
  );
};

export default StitchShape;
