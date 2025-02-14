import React, { useState } from "react";
import { Shape } from "react-konva";

function drawSingle(ctx) {
  // 細編み（×）の形
  ctx.moveTo(-10, -10);
  ctx.lineTo(10, 10);
  ctx.moveTo(10, -10);
  ctx.lineTo(-10, 10);
}

function drawHalfDouble(ctx) {
  // 中長編み（T）の形
  ctx.moveTo(-10, 0);
  ctx.lineTo(10, 0);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 30);
}

function drawDouble(ctx) {
  // 長編み（T に点1つ）の形
  ctx.moveTo(-10, 0);
  ctx.lineTo(10, 0);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 40);
  ctx.moveTo(-5, 18);
  ctx.lineTo(5, 22);
}

function drawTreble(ctx) {
  // 長々編み（T に点2つ）の形
  ctx.moveTo(-10, 0);
  ctx.lineTo(10, 0);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 50);
  ctx.moveTo(-5, 20);
  ctx.lineTo(5, 24);
  ctx.moveTo(-5, 26);
  ctx.lineTo(5, 30);
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
        } else if (type === "halfDouble") {
          drawHalfDouble(ctx);
        } else if (type === "double") {
          drawDouble(ctx);
        } else if (type === "treble") {
          drawTreble(ctx);
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
