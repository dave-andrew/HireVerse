import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.scss";
import "@smastrom/react-rating/style.css";
import ServiceContextProvider from "./components/context/ServiceContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ServiceContextProvider>
                <DevSupport
                    ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}>
                    <App />
                </DevSupport>
            </ServiceContextProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
