import React, { Component } from "react";
import Rulers from "./Components/Rulers";
import PdfDemo from "./pdfDemo";
import "./App.css";

const TextToSVG = require("text-to-svg");

const urlFonts =
  "https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700,800,900";
const localFont = "./WorkSans/WorkSans-Medium.ttf";

let SCALE_MM_COUNT = 300;
let SCALE_PT_COUNT = 68 * 12;

// Beta
// SCALE_MM_COUNT = 20;
// SCALE_PT_COUNT = 4 * 12;

const Scale_MM_stroke_width = 0.25;

class App extends Component {
  state = {
    font: {
      url: urlFonts,
      textToSVG: null
    }
  };
  componentDidMount(props) {
    TextToSVG.load(localFont, (err, textToSVG) => {
      this.setState({
        ...this.state,
        font: {
          ...this.state.font,
          textToSVG
        }
      });
    });
  }

  render() {
    let { font } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <Rulers
            mm={SCALE_MM_COUNT}
            pt={SCALE_PT_COUNT}
            font={font}
            strokeWidth={Scale_MM_stroke_width}
          />
          <br />
          <PdfDemo />
        </header>
      </div>
    );
  }
}

export default App;
