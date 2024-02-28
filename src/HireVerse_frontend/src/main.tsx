import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.scss";
import "@smastrom/react-rating/style.css";
import ServiceContextProvider from "./components/context/ServiceContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ServiceContextProvider>
            <App />
        </ServiceContextProvider>
    </React.StrictMode>,
);
