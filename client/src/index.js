import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "./Context";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// Load normalize css
import "./stylesheets/normalize.css";

// Render App component inside provider to the index element with class "root"
ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
