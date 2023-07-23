import "./App.scss";
import React from "react";
import { HashRouter } from "react-router-dom";
import Main from "./Main";

function App() {
  return (
    <div className="app">
      <div className="background-image" id="background-image" />

      <HashRouter>
        <Main />
      </HashRouter>
    </div>
  );
}

export default App;
