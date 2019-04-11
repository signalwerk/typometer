import React, { Component } from "react";
import RulerMM from "../RulerMM";
import RulerCicero from "../RulerCicero";
import RulerPt from "../RulerPt";
import { pt } from "../../Utility";

// view

// const DTP_PT = 25.4 / 72; // .352777778
// const Scaler = 1/DTP_PT; // export to illu
const Scaler = 10;

// Scale mm

// Scale pt
// const CICERO = 4.51165812456; // mm
// let pt = pt => pt * (CICERO / 12);

const RulerHeight = pt(4 * 12);
const RulerWidth = 350;

const ArtBleed = 0;
const MediaBleed = 10;

const style = {
  fontSize: pt(7),
  fontFamily: "Work Sans",
  fontWeight: 500
};

class Rulers extends Component {
  render() {
    const { font, pt, mm, strokeWidth } = this.props;
    const cicero = Math.floor(pt / 12);
    let textToSVG = font.textToSVG;

    if (!textToSVG) {
      return null;
    }

    const totalWidth = RulerWidth + 2 * MediaBleed;
    const totalHeight = RulerHeight + 2 * MediaBleed;

    return (
      <div className="Ruler">
        <svg width={totalWidth * Scaler} height={totalHeight * Scaler}>
          <defs>
            <style type="text/css">{`
                @import url(${font.url});

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
              <rect x="0" y="0" width={mm} height={RulerHeight} fill="white" />

              <RulerPt
                y={0 - ArtBleed}
                count={pt}
                bleed={ArtBleed}
                strokeWidth={strokeWidth}
                textToSVG={textToSVG}
                fontSize={style.fontSize}
              />

              <RulerMM
                y={RulerHeight + ArtBleed}
                count={mm}
                bleed={ArtBleed}
                strokeWidth={strokeWidth}
                textToSVG={textToSVG}
                fontSize={style.fontSize}
              />

              <RulerCicero
                y={RulerHeight / 2}
                count={cicero / 4 + 1}
                strokeWidth={strokeWidth}
                textToSVG={textToSVG}
                fontSize={style.fontSize * 0.75}
              />

              <text
                fontSize={style.fontSize}
                className={"text"}
                text-anchor="start"
                x="10"
                y="23"
              >
                Signalwerk · Stefan Huber · Version 2019.0
              </text>
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

export default Rulers;
