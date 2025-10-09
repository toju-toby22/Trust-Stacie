
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"; // Changed from { App } to App (default import)

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}