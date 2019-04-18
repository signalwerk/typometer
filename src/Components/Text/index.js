import React, { Fragment } from "react";

const anchorMap = {
  start: "left baseline",
  end: "right baseline",
  middle: "center baseline"
};

const getText = children => {
  return React.Children.map(children, child => {
    if (typeof child === "string") {
      return child;
    }
  }).join("");
};

const Text = ({
  x,
  y,
  outline,
  textToSVG,
  fontSize,
  className,
  "text-anchor": textAnchor,
  children,
  fill
}) => {
  if (outline && !textToSVG) {
    return null;
  }

  if (!children) {
    return null;
  }

  return (
    <Fragment>
      {outline ? (
        <Fragment>
          <path
            fill={fill || "black"}
            d={textToSVG.getD(`${getText(children)}`, {
              x,
              y,
              fontSize,
              anchor: anchorMap[textAnchor]
            })}
            className={className}
          />
        </Fragment>
      ) : (
        <Fragment>
          <text
            fontSize={fontSize}
            className={className}
            text-anchor={textAnchor || "start"}
            x={x}
            y={y}
          >
            {children}
          </text>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Text;
