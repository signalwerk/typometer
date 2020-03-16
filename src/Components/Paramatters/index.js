import React, { Component, Fragment, useState, useEffect } from "react";

import { Contour, Point, PointType } from "paramatters.lib";
import SVG from "../SVG";

// const p = new Point({
//   type: PointType.line,
//   x: 200,
//   y: 300
// });

const c = new Contour();

const p1 = new Point(15, 5).type(PointType.line);

c.points
  .push(new Point(5, 5).type(PointType.move))
  .push(p1)
  .push(new Point(15, 15).type(PointType.line))
  .push(new Point(5, 15).type(PointType.line));
c.close();

const Paramatters = () => {
  // console.log("----point ", c.toJS());
  // console.log("----point ", c.data);
  console.log("render Paramatters");

  const [state, setState] = useState(2);

  function handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
    // c.points.get(1).x(1 + c.points.get(1).x());
    p1.x(p1.x() + 1);
    setState(state + 1);
  }

  // With the second parameter
  useEffect(
    () => {
      console.log("I will run only when valueA changes");

      c.store.register(c.id(), () => setState(state + 1));
    },
    [c.id]
  );

  return (
    <Fragment>
      <button onClick={handleClick}>change</button>
      <svg width="100" height="100">
        <g>
          <SVG data={[c.resolve()]} />
        </g>
      </svg>
    </Fragment>
  );
};

export default Paramatters;
