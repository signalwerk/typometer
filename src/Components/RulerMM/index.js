import React, { Component, Fragment } from "react";
import Lines from "../Lines";
import Scale from "../Scale";
import Circle from "../Circle";
import Triangle from "../Triangle";

const TextToSVG = require("text-to-svg");

const Scale_10_MM_Height = 5;
const Scale_5_MM_Height = 4;
const Scale_1_MM_Height = 2;

const Text_MM_OFFSET_X = -0.5;
const Text_MM_OFFSET_Y = 3.25;

class RulerMM extends Component {
  render() {
    let { y, bleed, count, strokeWidth, textToSVG, fontSize } = this.props;

    return (
      <Fragment>
        {/* 10mm */}
        <Lines
          y={y}
          distance={10}
          count={count / 10 + 1}
          length={0 - (Scale_10_MM_Height + bleed)}
          strokeWidth={strokeWidth}
        />

        {/* 5mm */}
        <Lines
          y={y}
          distance={5}
          count={count / 5}
          length={0 - (Scale_5_MM_Height + bleed)}
          strokeWidth={strokeWidth}
          modulo={[2]}
        />

        {/* mm */}
        <Lines
          y={y}
          count={count}
          length={0 - (Scale_1_MM_Height + bleed)}
          strokeWidth={strokeWidth}
          modulo={[5]}
        />

        <Scale
          textToSVG={textToSVG}
          x={Text_MM_OFFSET_X}
          y={y - Text_MM_OFFSET_Y}
          anchor="right baseline"
          distance={10}
          count={count / 10 + 1}
          filter={index => index === 0}
          label={index => {
            return index < 10 ? index : `${parseInt(index / 10)}`;
          }}
          fontSize={fontSize}
          className={"text"}
        />

        <Scale
          textToSVG={textToSVG}
          x={0 - Text_MM_OFFSET_X}
          y={y - Text_MM_OFFSET_Y}
          anchor="left baseline"
          distance={10}
          count={count / 10 + 1}
          filter={index => index === 0}
          label={index => {
            return index < 10 ? "" : `${index % 10}`;
          }}
          fontSize={fontSize}
          className={"text"}
        />

        {[148, 210, 297].map(item => (
          <Triangle
            y={y - Scale_1_MM_Height - 0.3}
            x={item}
            direction="down"
            size={1}
          />
        ))}
      </Fragment>
    );
  }
}

export default RulerMM;
