import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ContextProvider } from "./contexts/ContextProvider";
import axiosClient from "./axios-client";

axiosClient.get("/csrf-token").then((response) => {
    const csrfToken = response.data.csrf_token;
    document
        .querySelector('meta[name="csrf-token"]')
        .setAttribute("content", csrfToken);
    console.log(csrfToken);
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    </StrictMode>
);
