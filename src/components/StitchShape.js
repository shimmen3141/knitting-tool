import React from "react";
import { Shape } from "react-konva";

const drawFunctions = {
  // マジックリング（円）の形
  magicRing: (ctx) => {
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.closePath();
  },
  // 鎖編み（楕円）の形
  chain: (ctx) => {
    ctx.beginPath();
    ctx.ellipse(0, 0, 5, 10, 0, 0, Math.PI * 2);
    ctx.closePath();
  },
  // 増し目（V）の形
  inc: (ctx) => {
    ctx.moveTo(-10, -10);
    ctx.lineTo(0, 10);
    ctx.lineTo(10, -10);
  },
  // 減らし目（逆V）の形
  dec: (ctx) => {
    ctx.moveTo(-10, 10);
    ctx.lineTo(0, -10);
    ctx.lineTo(10, 10);
  },
  // 細編み（×）の形
  single: (ctx) => {
    ctx.moveTo(-10, -10);
    ctx.lineTo(10, 10);
    ctx.moveTo(10, -10);
    ctx.lineTo(-10, 10);
  },
  // 中長編み（T）の形
  halfDouble: (ctx) => {
    ctx.moveTo(-10, 0);
    ctx.lineTo(10, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 30);
  },
  // 長編み（T に点1つ）の形
  double: (ctx) => {
    ctx.moveTo(-10, 0);
    ctx.lineTo(10, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 40);
    ctx.moveTo(-5, 18);
    ctx.lineTo(5, 22);
  },
  // 長々編み（T に点2つ）の形
  treble: (ctx) => {
    ctx.moveTo(-10, 0);
    ctx.lineTo(10, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 50);
    ctx.moveTo(-5, 20);
    ctx.lineTo(5, 24);
    ctx.moveTo(-5, 26);
    ctx.lineTo(5, 30);
  },
};

const StitchShape = ({ type, x, y, index, judgeIsSelected, handleColor }) => {
  return (
    <Shape
      key={index}
      x={x}
      y={y}
      sceneFunc={(ctx, shape) => {
        ctx.beginPath();
        const drawFunc = drawFunctions[type];
        if (drawFunc) {
          drawFunc(ctx);
        } else {
          console.error("Invalid type: ", type);
        }
        ctx.strokeShape(shape);
      }}
      // カーソルが入ったら色を変える
      stroke={judgeIsSelected(index) ? "red" : "black"}
      // カーソルが入ったら太さを変える
      strokeWidth={judgeIsSelected(index) ? 2 : 1}
      hitStrokeWidth={10}
      onClick={() => handleColor(index)}
    />
  );
};

export default StitchShape;
