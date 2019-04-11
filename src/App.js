import React, { Component } from "react";
import Ruler from "./Components/Ruler";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <br />
          <Ruler />
        </header>
      </div>
    );
  }
}

export default App;
