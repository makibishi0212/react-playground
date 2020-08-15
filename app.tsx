import React from "react";
import { render } from "react-dom";
import { PlayGroundEditor } from "./playground";
import "./playground.css";

render(
  <PlayGroundEditor
    html={`<div class="hello">Hello PlayGround!</div>`}
    css={`.hello {\n  background: #f48;\n}`}
    js={`const elem = document.querySelector(".hello");\nelem.style.color ="#fff";`}
  ></PlayGroundEditor>,
  document.querySelector("#playground")
);
