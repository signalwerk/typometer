let graphicState = ({ stroke, strokeWidth, fill }) => ({
  stroke: stroke || "none",
  strokeWidth: strokeWidth || 0,
  fill: fill || "black"
});

export const Polygon = ({ points, stroke, strokeWidth, fill }) => {
  return {
    type: "polygon",
    attributes: {
      points: points || [],
      ...graphicState({ stroke, strokeWidth, fill })
    }
  };
};

export const Line = ({ x1, y1, x2, y2, stroke, strokeWidth }) => {
  return {
    type: "line",
    attributes: {
      x1: x1 || 0,
      y1: y1 || 0,
      x2: x2 || 0,
      y2: y2 || 0,
      stroke: stroke || "black",
      strokeWidth: strokeWidth || 1
    }
  };
};

export const Circle = ({ cx, cy, r, stroke, strokeWidth, fill }) => {
  return {
    type: "circle",
    attributes: {
      cx: cx || 0,
      cy: cy || 0,
      r: r || 1,
      stroke: stroke || "none",
      strokeWidth: strokeWidth || 0,
      fill: fill || "black"
    }
  };
};

export const Text = ({
  x,
  y,
  fill,
  fontSize,
  fontFamily,
  textAnchor,
  text
}) => {
  return {
    type: "text",
    attributes: {
      x: x || 0,
      y: y || 0,
      fill: fill || "black",
      fontSize: fontSize || 10,
      fontFamily: fontFamily || "sans-serif",
      textAnchor: textAnchor || "start",
      text: text || ""
    }
  };
};
