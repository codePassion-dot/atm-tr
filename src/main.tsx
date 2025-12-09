import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Welcome from "./routes/welcome/page";
import Layout from "./layout";
import Home from "./routes/home/page";
import Balance from "./routes/balance/page";
import UpdateBalance from "./routes/update-balance/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/withdraw" element={<UpdateBalance />} />
            <Route path="/deposit" element={<UpdateBalance />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
