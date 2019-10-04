import React, { Component, Fragment } from "react";
import Lines from "../Lines";
import Scale from "../Scale";
import { pt } from "../../Utility";

const Text_PT_OFFSET_Y = 5.7;

class RulerPt extends Component {
  render() {
    let { y, bleed, count, strokeWidth, fontSize, textToSVG } = this.props;

    return (
      <Fragment>
        <Scale
          textToSVG={textToSVG}
          y={Text_PT_OFFSET_Y}
          distance={pt(12)}
          count={count / 12 + 1}
          label={index => (index > 0 ? index : "")}
          fontSize={fontSize}
          className={"text"}
        />
      </Fragment>
    );
  }
}

export default RulerPt;
