import React, { Component } from "react";
import Lines from "../Lines";
import Scale from "../Scale";
import Circle from "../Circle";
import Triangle from "../Triangle";

const TextToSVG = require("text-to-svg");

// view

const DTP_PT = 25.4 / 72; // .352777778
// const Scaler = 1/DTP_PT; // export to illu
const Scaler = 10;

// Scale mm
const SCALE_MM_COUNT = 300;

const Scale_1_MM_Height = 2;
const Scale_5_MM_Height = 4;
const Scale_10_MM_Height = 5;

const Scale_MM_stroke_width = 0.25;

// Scale pt
const CICERO = 4.51165812456; // mm
let pt = pt => pt * (CICERO / 12);

const SCALE_CICERO_COUNT = 68;
const SCALE_PT_COUNT = SCALE_CICERO_COUNT * 12;

const Scale_2_PT_Height = pt(4);
const Scale_6_PT_Height = pt(7);
const Scale_12_PT_Height = pt(9);

const RulerHeight = pt(4 * 12);
const RulerWidth = 350;

const ArtBleed = 0;
const MediaBleed = 10;

const Text_PT_OFFSET_Y = 5.7;

const Text_MM_OFFSET_X = -0.5;
const Text_MM_OFFSET_Y = 3.25;

const googleFonts =
  "https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700,800,900";
const style = {
  fontSize: pt(7),
  fontFamily: "Work Sans",
  fontWeight: 500
};

class Ruler extends Component {
  state = {
    textToSVG: null
  };
  componentDidMount(props) {
    TextToSVG.load("./WorkSans/WorkSans-Medium.ttf", (err, textToSVG) => {
      this.setState({ textToSVG });
    });
  }

  render() {
    const totalWidth = RulerWidth + 2 * MediaBleed;
    const totalHeight = RulerHeight + 2 * MediaBleed;
    let textToSVG = this.state.textToSVG;

    return (
      <div className="Ruler">
        <svg width={totalWidth * Scaler} height={totalHeight * Scaler}>
          <defs>
            <style type="text/css">{`
                @import url(${googleFonts});

                .text {
                  font-family: ${style.fontFamily};
                  font-weight: ${style.fontWeight};
                  font-style: normal;
                }
                `}</style>
          </defs>

          <g transform={`scale(${Scaler})`}>
            <g transform={`translate(${MediaBleed},${MediaBleed})`}>
              <rect
                x={0 - MediaBleed}
                y={0 - MediaBleed}
                width={totalWidth}
                height={totalHeight}
                fill="yellow"
              />
              <rect
                x="0"
                y="0"
                width={RulerWidth}
                height={RulerHeight}
                fill="gray"
              />
              <rect
                x="0"
                y="0"
                width={SCALE_MM_COUNT}
                height={RulerHeight}
                fill="white"
              />

              {/* 12pt */}
              <Lines
                y={0 - ArtBleed}
                distance={pt(12)}
                count={SCALE_PT_COUNT / 12 + 1}
                length={Scale_12_PT_Height + ArtBleed}
                strokeWidth={Scale_MM_stroke_width}
              />

              {/* 6pt */}
              <Lines
                y={0 - ArtBleed}
                distance={pt(6)}
                count={SCALE_PT_COUNT / 6}
                length={Scale_6_PT_Height + ArtBleed}
                strokeWidth={Scale_MM_stroke_width}
                modulo={[2]}
              />

              {/* 2pt */}
              <Lines
                y={0 - ArtBleed}
                distance={pt(2)}
                count={SCALE_PT_COUNT / 2}
                length={Scale_2_PT_Height + ArtBleed}
                strokeWidth={Scale_MM_stroke_width}
                modulo={[3]}
              />
              <Scale
                textToSVG={textToSVG}
                y={Text_PT_OFFSET_Y}
                distance={pt(12)}
                count={SCALE_CICERO_COUNT + 1}
                label={index => (index > 0 ? index : "")}
                fontSize={style.fontSize}
                className={"text"}
              />

              {/* CICERO */}
              <Lines
                y={6.5}
                distance={pt(12 * 4)}
                count={SCALE_CICERO_COUNT / 4 + 1}
                length={3}
                filter={index => index === 0}
                strokeWidth={Scale_MM_stroke_width}
              />

              <Circle
                y={RulerHeight / 2}
                distance={pt(12 * 4)}
                count={SCALE_CICERO_COUNT / 4 + 1}
                r={1.4}
                strokeWidth={Scale_MM_stroke_width}
              />

              <Scale
                textToSVG={textToSVG}
                y={RulerHeight / 2 + 0.65}
                distance={pt(12 * 4)}
                count={SCALE_CICERO_COUNT / 4 + 1}
                fill={"white"}
                fontSize={style.fontSize * 0.75}
                className={"text"}
              />

              {/* 10mm */}
              <Lines
                y={RulerHeight + ArtBleed}
                distance={10}
                count={SCALE_MM_COUNT / 10 + 1}
                length={0 - (Scale_10_MM_Height + ArtBleed)}
                strokeWidth={Scale_MM_stroke_width}
              />

              {/* 5mm */}
              <Lines
                y={RulerHeight + ArtBleed}
                distance={5}
                count={SCALE_MM_COUNT / 5}
                length={0 - (Scale_5_MM_Height + ArtBleed)}
                strokeWidth={Scale_MM_stroke_width}
                modulo={[2]}
              />

              {/* mm */}
              <Lines
                y={RulerHeight + ArtBleed}
                count={SCALE_MM_COUNT}
                length={0 - (Scale_1_MM_Height + ArtBleed)}
                strokeWidth={Scale_MM_stroke_width}
                modulo={[5]}
              />
              <Scale
                textToSVG={textToSVG}
                x={Text_MM_OFFSET_X}
                y={RulerHeight - Text_MM_OFFSET_Y}
                anchor="right baseline"
                distance={10}
                count={SCALE_MM_COUNT / 10 + 1}
                filter={index => index === 0}
                label={index => {
                  return index < 10 ? index : `${parseInt(index / 10)}`;
                }}
                fontSize={style.fontSize}
                className={"text"}
              />
              <Scale
                textToSVG={textToSVG}
                x={0 - Text_MM_OFFSET_X}
                y={RulerHeight - Text_MM_OFFSET_Y}
                anchor="left baseline"
                distance={10}
                count={SCALE_MM_COUNT / 10 + 1}
                filter={index => index === 0}
                label={index => {
                  return index < 10 ? "" : `${index % 10}`;
                }}
                fontSize={style.fontSize}
                className={"text"}
              />

              <text
                fontSize={style.fontSize}
                className={"text"}
                text-anchor="middle"
                x="10"
                y="23"
              >
                g
              </text>

              <text
                fontSize={style.fontSize}
                className={"text"}
                text-anchor="end"
                x="20"
                y="23"
              >
                a
              </text>

              {[148, 210, 297].map(item => (
                <Triangle
                  direction="down"
                  x={item}
                  y={RulerHeight - Scale_1_MM_Height - 0.3}
                  size={1}
                />
              ))}
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

export default Ruler;
