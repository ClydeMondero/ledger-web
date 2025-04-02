import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Loader from "./components/Loader";

axios.defaults.baseURL = "http://localhost:8000/api";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="grid grid-cols-12 grid-row-12 h-dvh relative">
          <Sidebar />
          <Content />
        </div>
        <ToastContainer position="bottom-right" />
        <Loader />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
