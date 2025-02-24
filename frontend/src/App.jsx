import { BrowserRouter, Routes, Route } from "react-router-dom";
import Balance from "./modules/Balance";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Balance />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
