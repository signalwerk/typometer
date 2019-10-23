export const Group = ({ transformations, children }) => {
  return {
    type: "group",
    attributes: {
      transformations: transformations || [],
      children: children || []
    }
  };
};

export const Scale = (x, y) => {
  return {
    type: "scale",
    attributes: {
      x: x || 1,
      y: y || 1
    }
  };
};

export const Rotate = (angle, cx, cy) => {
  return {
    type: "rotate",
    attributes: {
      angle: angle || 0,
      cx: cx || 0,
      cy: cy || 0
    }
  };
};

export const Translate = (x, y) => {
  return {
    type: "translate",
    attributes: {
      x: x || 0,
      y: y || 0
    }
  };
};
