import { pt, cicero } from "../Utility";
const Scale_10_MM_Height = 5;
const Scale_5_MM_Height = 4;
const Scale_1_MM_Height = 2;

const Scale_12_PT_Height = pt(9);
const Scale_6_PT_Height = pt(7);
const Scale_2_PT_Height = pt(4);

const ArtBleed = 0;

const SCALE_MM_COUNT = 300;
const SCALE_CICERO_COUNT = 68;
const SCALE_PT_COUNT = SCALE_CICERO_COUNT * 12;

const Scale_stroke_width = 0.25;
const RulerHeight = pt(4 * 12);

const style = {
  fontSize: pt(7),
  fontFamily: "Work Sans",
  fontWeight: 500
};

export function rulers({ textToSVG }) {
  return [
    ...rulerPt({
      y: 0 - ArtBleed,
      count: SCALE_PT_COUNT,
      bleed: ArtBleed,
      strokeWidth: Scale_stroke_width,
      textToSVG: textToSVG,
      fontSize: style.fontSize
    }),

    ...rulerMM({
      y: RulerHeight + ArtBleed,
      count: SCALE_MM_COUNT,
      bleed: ArtBleed,
      strokeWidth: Scale_stroke_width,
      textToSVG: textToSVG,
      fontSize: style.fontSize
    }),

    ...rulerCicero({
      y: RulerHeight / 2,
      count: SCALE_CICERO_COUNT / 4 + 1,
      bleed: ArtBleed,
      strokeWidth: Scale_stroke_width,
      textToSVG: textToSVG,
      fontSize: style.fontSize
    })
  ];
}

// generate the pt ruler
export function rulerPt({ y, count, bleed, strokeWidth, textToSVG, fontSize }) {
  // 12pt
  let scale12pt = lines({
    y: y,
    distance: pt(12),
    count: count / 12 + 1,
    length: Scale_12_PT_Height + bleed,
    strokeWidth: strokeWidth
  });
  // 6pt
  let scale6pt = lines({
    y: y,
    distance: pt(6),
    count: count / 6,
    length: Scale_6_PT_Height + bleed,
    strokeWidth: strokeWidth,
    modulo: [2]
  });
  // 2pt
  let scale2pt = lines({
    y: y,
    distance: pt(2),
    count: count / 2,
    length: Scale_2_PT_Height + bleed,
    strokeWidth: strokeWidth,
    modulo: [3]
  });

  let data = [...scale12pt, ...scale6pt, ...scale2pt];
  return data;
}

// generate the cicero ruler
export function rulerCicero({ y, count, strokeWidth, textToSVG, fontSize }) {
  let scale1cicero = lines({
    y: 6.5,
    distance: cicero(4),
    count: count,
    length: 3,
    filter: index => index === 0,
    strokeWidth: strokeWidth
  });
  let data = [...scale1cicero];
  return data;
}

// generate the mm ruler
export function rulerMM({ y, count, bleed, strokeWidth, textToSVG, fontSize }) {
  // 10mm
  let scale10mm = lines({
    y,
    distance: 10,
    count: count / 10 + 1,
    length: 0 - (Scale_10_MM_Height + bleed),
    strokeWidth
  });

  // 5mm
  let scale5mm = lines({
    y,
    distance: 5,
    count: count / 5,
    length: 0 - (Scale_5_MM_Height + bleed),
    strokeWidth,
    modulo: [2]
  });

  // 1mm
  let scale1mm = lines({
    y,
    count: count,
    length: 0 - (Scale_1_MM_Height + bleed),
    strokeWidth,
    modulo: [5]
  });

  let data = [...scale10mm, ...scale5mm, ...scale1mm];
  return data;
}

// generate repeating lines
export function lines({
  x,
  y,
  count,
  length,
  distance,
  stroke,
  strokeWidth,
  modulo,
  filter
}) {
  let lineList = [];

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

  xPositions.forEach(index => {
    let currentX = index * (distance || 1) + (x || 0);

    let yStart = y || 0;
    let yEnd = yStart + length;

    if (length < 0) {
      yStart = yStart + length;
      yEnd = yEnd - length;
    }

    lineList.push(
      {
        type: "line",
        attributes: {
          x1: currentX,
          y1: yStart,
          x2: currentX,
          y2: yEnd,
          stroke: stroke || "black",
          strokeWidth: strokeWidth || 1
        }
      }
      // <Fragment>
      //   <rect
      //     x={currentX - strokeWidth / 2}
      //     y={yStart}
      //     width={strokeWidth}
      //     height={yEnd - yStart}
      //     fill={stroke || "black"}
      //   />
      // </Fragment>
    );
  });

  return lineList;
}
