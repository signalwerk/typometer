import { pt, cicero } from "../Utility";
import { Line, Text, Circle, Polygon } from "./base";
import { Group, Scale, Rotate, Translate } from "./group";
import { triangle } from "./Triangle/utils";

const Scale_10_MM_Height = 5;
const Scale_5_MM_Height = 4;
const Scale_1_MM_Height = 2;

const Scale_12_PT_Height = pt(9);
const Scale_6_PT_Height = pt(7);
const Scale_2_PT_Height = pt(4);

const Text_PT_OFFSET_Y = 2.3;

const Text_MM_OFFSET_X = -0.55;
const Text_MM_OFFSET_Y = 1.7;

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

const VERSION = "2019.2";

const fontSizeCaption = style.fontSize * 0.5;
let fontSizeCircle = style.fontSize * 0.75;

export function rulers() {
  return [
    ...rulerPt({
      y: 0 - ArtBleed,
      count: SCALE_PT_COUNT,
      bleed: ArtBleed,
      strokeWidth: Scale_stroke_width,
      fontSize: style.fontSize
    }),

    ...rulerMM({
      y: RulerHeight + ArtBleed,
      count: SCALE_MM_COUNT,
      bleed: ArtBleed,
      strokeWidth: Scale_stroke_width,
      fontSize: style.fontSize
    }),

    ...rulerCicero({
      y: RulerHeight / 2,
      count: SCALE_CICERO_COUNT / 4 + 1,
      bleed: ArtBleed,
      strokeWidth: Scale_stroke_width,
      fontSize: style.fontSize
    }),

    ...[148, 210, 297].map(item => {
      let points = triangle({
        y: RulerHeight - 2 - 0.3,
        x: item,
        direction: "down",
        size: 1
      });
      return Polygon({
        points,
        fill: "red"
      });
    }),

    Group({
      transformations: [
        Translate(cicero(SCALE_CICERO_COUNT + 1.5), RulerHeight / 2),
        Rotate(-90, 0, 0)
      ],
      children: [
        Text({
          x: 0,
          y: 0,
          text: "signalwerk.ch",
          fill: "cyan",
          fontSize: fontSizeCircle,
          textAnchor: "center"
        })
      ]
    }),

    Text({
      x: cicero(SCALE_CICERO_COUNT - 2),
      y: RulerHeight / 2 + fontSizeCaption * 0.3,
      text: `${VERSION}`,
      fill: "pink",
      fontSize: fontSizeCaption,
      textAnchor: "center"
    }),

    Text({
      x: 10,
      y: 23,
      fill: "red",
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
      textAnchor: "start",
      text: `Signalwerk · Stefan Huber · Version ${VERSION}`
    })
  ];
}

// generate the pt ruler
export function rulerPt({ y, count, bleed, strokeWidth, fontSize }) {
  // 12pt
  let scale12pt = scale({
    y: y,
    distance: pt(12),
    count: count / 12 + 1,
    length: Scale_12_PT_Height + bleed,
    strokeWidth: strokeWidth,
    label: ({ x1, y1, x2, y2, index }) => {
      if (index === 0) {
        return false;
      }
      return [
        Text({
          x: x2,
          y: y2 + Text_PT_OFFSET_Y,
          text: index,
          fill: "red",
          fontSize: style.fontSize,
          textAnchor: "center baseline"
        })
      ];
    }
  });
  // 6pt
  let scale6pt = scale({
    y: y,
    distance: pt(6),
    count: count / 6,
    length: Scale_6_PT_Height + bleed,
    strokeWidth: strokeWidth,
    modulo: [2]
  });
  // 2pt
  let scale2pt = scale({
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
export function rulerCicero({ y, count, strokeWidth, fontSize }) {
  let scale1cicero = scale({
    y: y,
    distance: cicero(4),
    count: count,
    length: -2.8,
    filter: index => index === 0,
    strokeWidth: strokeWidth,
    label: ({ x1, y1, y2, index }) => {
      return [
        Circle({
          cx: x1,
          cy: y2,
          fill: "red",
          r: pt(4)
        }),

        Text({
          x: x1,
          y: y2 + 0.6,
          text: index,
          fill: "blue",
          fontSize: fontSizeCircle,
          textAnchor: "center baseline"
        })
      ];
    }
  });
  let data = [...scale1cicero];
  return data;
}

// generate the mm ruler
export function rulerMM({ y, count, bleed, strokeWidth, fontSize }) {
  // 10mm
  let scale10mm = scale({
    y,
    distance: 10,
    count: count / 10 + 1,
    length: 0 - (Scale_10_MM_Height + bleed),
    strokeWidth,
    label: ({ x1, y1, index }) => {
      return [
        Text({
          x: x1 + Text_MM_OFFSET_X,
          y: y1 + Text_MM_OFFSET_Y,
          text: index < 10 ? index : `${parseInt(index / 10)}`,
          fill: "green",
          fontSize: style.fontSize,
          textAnchor: "right baseline"
        }),

        Text({
          x: x1 - Text_MM_OFFSET_X,
          y: y1 + Text_MM_OFFSET_Y,
          text: index < 10 ? "" : `${index % 10}`,
          fill: "green",
          fontSize: style.fontSize,
          textAnchor: "left baseline"
        })
      ];
    }
  });

  // 5mm
  let scale5mm = scale({
    y,
    distance: 5,
    count: count / 5,
    length: 0 - (Scale_5_MM_Height + bleed),
    strokeWidth,
    modulo: [2]
  });

  // 1mm
  let scale1mm = scale({
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
export function scale({
  x,
  y,
  count,
  label,
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
      Line({
        x1: currentX,
        y1: yStart,
        x2: currentX,
        y2: yEnd,
        stroke: stroke,
        strokeWidth: strokeWidth
      })
    );
    if (label) {
      let labelProps = label({
        x1: currentX,
        y1: yStart,
        x2: currentX,
        y2: yEnd,
        index
      });
      if (labelProps) {
        lineList.push(...labelProps);
      }
    }
  });

  return lineList;
}
