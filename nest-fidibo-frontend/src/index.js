import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./router/Router";

ReactDOM.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);
