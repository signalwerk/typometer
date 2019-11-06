import React, { Fragment, useEffect, useState } from "react";
import { Line } from "./line";
import { Text } from "./text";
import { Circle } from "./circle";
import { Polygon } from "./polygon";
import { Contour } from "./contour";
import { Group } from "./group";

let Render = ({ data }, fontRenderer) => {

  console.log("handler")
  return data.map(item => {
    return (
      <Fragment>
        {item.get('__type') === "circle" && Circle({ data: item.attributes })}
        {item.get('__type') === "polygon" && Polygon({ data: item.attributes })}
        {item.get('__type') === "contour" && Contour({ data: item })}
        {item.get('__type') === "line" && Line({ data: item.attributes })}
        {item.get('__type') === "group" &&
          Group({ data: item.attributes }, fontRenderer)}
        {item.get('__type') === "text" &&
          fontRenderer &&
          Text({ data: item.attributes }, fontRenderer)}
      </Fragment>
    );
  });
};

export default Render;
