import React, { Component, Fragment } from "react";

class Lines extends Component {
  render() {
    const {
      x,
      y,
      distance,
      count,
      length,
      stroke,
      strokeWidth,
      modulo,
      filter
    } = this.props;

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

          let yStart = y || 0;
          let yEnd = yStart + length;

          if (length < 0) {
            yStart = yStart + length;
            yEnd = yEnd - length;
          }

          return (
            <Fragment>
              <rect
                x={currentX - strokeWidth / 2}
                y={yStart}
                width={strokeWidth}
                height={yEnd - yStart}
                fill={stroke || "black"}
              />
            </Fragment>
          );
        })}
      </Fragment>
    );
  }
}

// <line
//   x1={currentX}
//   y1={yStart}
//   x2={currentX}
//   y2={yEnd}
//   stroke={stroke || "black"}
//   strokeWidth={strokeWidth}
// />

export default Lines;
