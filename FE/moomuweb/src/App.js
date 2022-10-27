import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogiInPage from "./pages/LogIn";
import DashBoard from "./pages/DashBoard";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogiInPage />} />
          <Route path="/main" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
