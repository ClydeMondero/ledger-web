import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

const App = () => {
  return (
    <BrowserRouter>
      <div className="grid grid-cols-12 grid-row-12 h-dvh relative">
        <Sidebar />
        <Content />
      </div>
    </BrowserRouter>
  );
};

export default App;
