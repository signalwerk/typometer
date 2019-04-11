import React, { Component, Fragment } from "react";
import Lines from "../Lines";
import Scale from "../Scale";
import { CICERO, pt } from "../../Utility";

const Scale_12_PT_Height = pt(9);
const Scale_6_PT_Height = pt(7);
const Scale_2_PT_Height = pt(4);

const Text_PT_OFFSET_Y = 5.7;

class RulerPt extends Component {
  render() {
    let { y, bleed, count, strokeWidth, fontSize, textToSVG } = this.props;

    return (
      <Fragment>
        {/* 12pt */}
        <Lines
          y={y}
          distance={pt(12)}
          count={count / 12 + 1}
          length={Scale_12_PT_Height + bleed}
          strokeWidth={strokeWidth}
        />

        {/* 6pt */}
        <Lines
          y={y}
          distance={pt(6)}
          count={count / 6}
          length={Scale_6_PT_Height + bleed}
          strokeWidth={strokeWidth}
          modulo={[2]}
        />

        {/* 2pt */}
        <Lines
          y={y}
          distance={pt(2)}
          count={count / 2}
          length={Scale_2_PT_Height + bleed}
          strokeWidth={strokeWidth}
          modulo={[3]}
        />

        <Scale
          textToSVG={textToSVG}
          y={Text_PT_OFFSET_Y}
          distance={pt(12)}
          count={count + 1}
          label={index => (index > 0 ? index : "")}
          fontSize={fontSize}
          className={"text"}
        />

      </Fragment>
    );
  }
}

export default RulerPt;
