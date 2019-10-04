import React, { Component, Fragment } from "react";
import Scale from "../Scale";
import Triangle from "../Triangle";

const Text_MM_OFFSET_X = -0.5;
const Text_MM_OFFSET_Y = 3.25;

const Scale_1_MM_Height = 2;


class RulerMM extends Component {
  render() {
    let { y, bleed, count, strokeWidth, textToSVG, fontSize } = this.props;

    return (
      <Fragment>

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
