import React, { Component, Fragment } from "react";
import Lines from "../Lines";
import Scale from "../Scale";
import Circle from "../Circle";
import { CICERO, pt } from "../../Utility";

class RulerCicero extends Component {
  render() {
    let { y, strokeWidth, count, fontSize, textToSVG } = this.props;

    return (
      <Fragment>
        {/* CICERO */}
        <Lines
          y={6.5}
          distance={pt(12 * 4)}
          count={count}
          length={3}
          filter={index => index === 0}
          strokeWidth={strokeWidth}
        />

        <Circle
          y={y}
          distance={pt(12 * 4)}
          count={count}
          r={1.4}
          strokeWidth={strokeWidth}
        />

        <Scale
          textToSVG={textToSVG}
          y={y + 0.65}
          distance={pt(12 * 4)}
          count={count}
          fill={"white"}
          fontSize={fontSize}
          className={"text"}
        />
      </Fragment>
    );
  }
}

export default RulerCicero;
