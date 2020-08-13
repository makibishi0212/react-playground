import React from "react";
import { render } from "react-dom";
import { PlayGroundEditor } from "./playground";
import "./playground.css";

render(
  <PlayGroundEditor></PlayGroundEditor>,
  document.querySelector("#playground")
);
