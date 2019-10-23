import React, { Component } from "react";
import MiniPdf from "mini-pdf";

// const fs = require('fs');
//
// fs.writeFileSync('../data/phraseFreqs.json', JSON.stringify(output));

class Pdf extends Component {
  constructor(props) {
    super(props);
    this.pdf = new MiniPdf();
  }

  render() {
    return (
      <div className="pdf">
        <pre><code>{`${this.pdf}`}</code></pre>
      </div>
    );
  }
}

export default Pdf;
