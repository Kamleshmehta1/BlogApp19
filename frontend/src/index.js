import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateProvider } from "./Components/StateProvider";
import { BrowserRouter } from "react-router-dom";
import reducer, { initialState } from "./Components/Reducer";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter >
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </BrowserRouter>
);
