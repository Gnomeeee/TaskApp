import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./features/auth/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/inter/400";
import "@fontsource/inter/500";
import "@fontsource/inter/600";
import "@fontsource/inter/700";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
