import { BrowserRouter, Routes, Route } from "react-router-dom";
import Balance from "./pages/Balance";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/balance" element={<Balance />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
