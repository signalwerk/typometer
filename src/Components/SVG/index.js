import React, { Fragment, useEffect, useState } from "react";
import { Line } from "./base/line";
import { Text } from "./base/text";
import { Circle } from "./base/circle";
const TextToSVG = require("text-to-svg");
const localFont = "./WorkSans/WorkSans-Medium.ttf";

let Render = ({ data }) => {
  const [fontRenderer, setFontRenderer] = useState(false);

  useEffect(() => {
    TextToSVG.load(localFont, (err, textToSVG) => {
      setFontRenderer(textToSVG);
    });
  });

  return data.map(item => {
    return (
      <Fragment>
        {item.type === "circle" && Circle({ data: item.attributes })}
        {item.type === "line" && Line({ data: item.attributes })}
        {item.type === "text" &&
          fontRenderer &&
          Text({ data: item.attributes }, fontRenderer)}
      </Fragment>
    );
  });
};

export default Render;
