import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import "./pages/Home.css";
import "./styles/layout.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/ctc">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
