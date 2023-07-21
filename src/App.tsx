import "./App.scss";
import React, { useState } from "react";
import { HashRouter } from "react-router-dom";
import Main from "./Main";

function App() {
  return (
    <div className="app">
      <div className="background-image" />

      <HashRouter>
        <Main />
      </HashRouter>
    </div>
  );
}

export default App;
