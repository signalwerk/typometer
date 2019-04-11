import React, { Component, Fragment } from "react";

class Scale extends Component {
  render() {
    const {
      x,
      y,
      distance,
      count,
      modulo,
      style,
      textAnchor,
      label,
      fill,
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
            <text
              style={style}
              textAnchor={textAnchor || "middle"}
              x={currentX}
              y={y || 0}
              fill={fill || "black"}
            >
              {label ? label(index) : index}
            </text>
          );
        })}
      </Fragment>
    );
  }
}

export default Scale;
