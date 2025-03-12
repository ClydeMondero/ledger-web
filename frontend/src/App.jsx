import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex h-dvh">
        <Sidebar />
        <Content />
      </div>
    </BrowserRouter>
  );
};

export default App;
