import React, { Component } from "react";

import Demo from "./Demo";

// const fs = require('fs');
//
// fs.writeFileSync('../data/phraseFreqs.json', JSON.stringify(output));

class Pdf extends Component {
  constructor(props) {
    super(props);
    this.pdf = new Demo();
  }

  render() {
    return (
      <div className="App">
        <pre><code>{`${this.pdf}`}</code></pre>
      </div>
    );
  }
}

export default Pdf;
