import React, { Component, Fragment } from "react";

// const textToSVG = TextToSVG.loadSync('./WorkSans/WorkSans-Medium.ttf');

class Scale extends Component {
  render() {
    const {
      x,
      y,
      distance,
      count,
      modulo,
      // style,
      anchor,
      label,
      fill,
      filter,
      fontSize,
      className,
      textToSVG
    } = this.props;
    
    if (!textToSVG) {
      return null;
    }

    let xPositions = Array.from({ length: count }, (_, index) => index).filter(
      item => {
        if (filter) {
          if (filter(item)) {
            return false;
          }
        }
        return (modulo || []).every(m => {
          return item % m !== 0;
        });
      }
    );

    return (
      <Fragment>
        {xPositions.map(index => {
          let currentX = index * (distance || 1) + (x || 0);

          const options = {
            x: currentX,
            y: y || 0,
            fontSize: fontSize,
            anchor: anchor || "center baseline"
          };

          let text = label ? label(index) : index;
          let svgD = textToSVG.getD(`${text}`, options);

          return <path fill={fill || "black"} d={svgD} className={className} />;
        })}
      </Fragment>
    );
  }
}

export default Scale;

// <text
//   style={style}
//   textAnchor={textAnchor || "middle"}
//   x={currentX}
//   y={y || 0}
//   fill={fill || "black"}
//   fontSize={fontSize}
//   className={className}
// >
//   {label ? label(index) : index}
// </text>
