import React, { Component } from "react";
import Lines from "../Lines";
import Scale from "../Scale";
import Circle from "../Circle";
import Triangle from "../Triangle";
import RulerMM from "../RulerMM";
import RulerPt from "../RulerPt";
import { CICERO, pt } from "../../Utility";

const TextToSVG = require("text-to-svg");

// view

const DTP_PT = 25.4 / 72; // .352777778
// const Scaler = 1/DTP_PT; // export to illu
const Scaler = 10;

// Scale mm
const SCALE_MM_COUNT = 300;

const Scale_MM_stroke_width = 0.25;

// Scale pt
// const CICERO = 4.51165812456; // mm
// let pt = pt => pt * (CICERO / 12);

const SCALE_CICERO_COUNT = 68;
const SCALE_PT_COUNT = SCALE_CICERO_COUNT * 12;

const RulerHeight = pt(4 * 12);
const RulerWidth = 350;

const ArtBleed = 0;
const MediaBleed = 10;


const googleFonts =
  "https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700,800,900";
const style = {
  fontSize: pt(7),
  fontFamily: "Work Sans",
  fontWeight: 500
};

class Rulers extends Component {
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

              <RulerPt
                y={0 - ArtBleed}
                count={SCALE_PT_COUNT}
                bleed={ArtBleed}
                strokeWidth={Scale_MM_stroke_width}
                textToSVG={textToSVG}
                fontSize={style.fontSize}
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

              <RulerMM
                y={RulerHeight + ArtBleed}
                count={SCALE_MM_COUNT}
                bleed={ArtBleed}
                strokeWidth={Scale_MM_stroke_width}
                textToSVG={textToSVG}
                fontSize={style.fontSize}
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
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

export default Rulers;
