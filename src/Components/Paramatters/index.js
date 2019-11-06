import React, { Component, Fragment } from "react";
import { Contour, Point, PointType } from "paramatters.lib";
import SVG from "../SVG";

// const p = new Point({
//   type: PointType.line,
//   x: 200,
//   y: 300
// });

const c = new Contour();

c.points
  .push(new Point(5, 5).type(PointType.move))
  .push(new Point(15, 5).type(PointType.line))
  .push(new Point(15, 15).type(PointType.line))
  .push(new Point(5, 15).type(PointType.line));
c.close();

const Paramatters = () => {
  // console.log("----point ", c.toJS());
  // console.log("----point ", c.data);
  console.log("Paramatters")

  return (
    <Fragment>
      <svg width="100" height="100">
        <g>
          <SVG data={[c.resolve()]} />
        </g>
      </svg>
    </Fragment>
  );
};

export default Paramatters;
