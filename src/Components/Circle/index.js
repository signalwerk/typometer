import React, { Component, Fragment } from "react";

class Circle extends Component {
  render() {
    const {
      x,
      y,
      distance,
      count,
      fill,
      r,
      modulo,
      stroke,
      strokeWidth,
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
            <circle
              cx={currentX}
              cy={y || 0}
              r={r}
              stroke={stroke || "none"}
              strokeWidth={strokeWidth || 0}
              fill={fill || "black"}
            />
          );
        })}
      </Fragment>
    );
  }
}

export default Circle;
