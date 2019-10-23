import React, { Component } from "react";
import Triangle from "../Triangle";

import SVG from "../SVG";
import { pt as _pt } from "../../Utility";
import { rulers } from "../../Utility/generators";

// view

// const DTP_PT = 25.4 / 72; // .352777778
// const Scaler = 1/DTP_PT; // export to illu
const Scaler = 10;

// Scale mm

// Scale pt
// const CICERO = 4.51165812456; // mm
// let pt = pt => pt * (CICERO / 12);

const RulerHeight = _pt(4 * 12);

const holeOffset = _pt(3 * 12);

const ArtBleed = 0;
const MediaBleed = 10;

const style = {
  fontSize: _pt(7),
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

    const RulerWidth = _pt(pt) + holeOffset + RulerHeight / 2;

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
              <rect
                x="0"
                y="0"
                width={_pt(pt) + holeOffset}
                height={RulerHeight}
                fill="white"
              />

              <g
                transform={`translate(${_pt(pt) + holeOffset},${RulerHeight /
                  2})`}
              >
                <circle cx={0} cy={0} r={RulerHeight / 2} fill="red" />

                <circle cx={0} cy={0} r={_pt(6)} fill={"yellow"} />
              </g>

              <SVG data={rulers({ textToSVG })} />
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

export default Rulers;
