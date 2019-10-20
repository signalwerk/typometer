import React, { Component, Fragment } from "react";
import Circle from "../Circle";
import Text from "../Text";
import { pt, cicero } from "../../Utility";

class RulerCicero extends Component {
  render() {
    let { y, strokeWidth, count, fontSize, textToSVG } = this.props;

    let fontSizeCircle = fontSize * 0.75;
    let fontSizeCaption = fontSize * 0.5;
    let captionX = cicero((count - 1) * 4 + 1.5);
    // let captionX = cicero( (1) *4+2)

    return (
      <Fragment>
        {/* CICERO */}



        <Text
          x={cicero((count - 2) * 4 + 2)}
          y={y + fontSizeCaption * 0.3}
          text-anchor="middle"
          outline={true}
          textToSVG={textToSVG}
          fontSize={fontSizeCaption}
          className={"text"}
        >
          2019.1
        </Text>

        <g transform={`translate(${captionX},${y}) rotate(-90,0,0)`}>
          <Text
            x={0}
            y={0}
            text-anchor="middle"
            outline={false}
            textToSVG={textToSVG}
            fontSize={fontSizeCircle}
            className={"text"}
          >
            signalwerk.ch
          </Text>
        </g>
      </Fragment>
    );
  }
}

export default RulerCicero;
