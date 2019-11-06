import React, { Fragment, useEffect, useState } from "react";
import Handler from "./base";
const TextToSVG = require("text-to-svg");
const localFont = "./WorkSans/WorkSans-Medium.ttf";

let Render = ({ data }) => {
  const [fontRenderer, setFontRenderer] = useState(false);

  // useEffect(() => {
  //   TextToSVG.load(localFont, (err, textToSVG) => {
  //     setFontRenderer(textToSVG);
  //   });
  // });
  console.log("Render")

    return (
      <Fragment>
        {Handler({ data }, fontRenderer)}
      </Fragment>
    );
};

export default Render;
