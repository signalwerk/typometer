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

          return (
            <line
              x1={currentX}
              y1={y || 0}
              x2={currentX}
              y2={(y || 0) + length}
              stroke={stroke || "black"}
              strokeWidth={strokeWidth}
            />
          );
        })}
      </Fragment>
    );
  }
}

export default Lines;
