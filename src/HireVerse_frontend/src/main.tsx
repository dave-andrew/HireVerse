import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.scss";
import "@smastrom/react-rating/style.css";
import ServiceContextProvider from "./components/context/ServiceContext";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ServiceContextProvider>
            <App />
        </ServiceContextProvider>
    </React.StrictMode>,
);
