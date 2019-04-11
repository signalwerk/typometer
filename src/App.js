import React, { Component } from "react";
import Rulers from "./Components/Rulers";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <br />
          <Rulers />
        </header>
      </div>
    );
  }
}

export default App;
