import React from "react";
// import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import "./styles.scss";

import App from "./App.jsx";

// create an element that React will render stuff into
const rootElement = document.createElement("div");

// put that element onto the page
document.body.appendChild(rootElement);
const root = createRoot(rootElement);

// have react render the JSX element into the root element.
root.render(<App />);
