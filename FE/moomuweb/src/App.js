import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";

import LogiInPage from "./pages/LogIn";
import DashBoard from "./pages/DashBoard";
import MenuSidebar from "./componentes/menuSidebar";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MenuSidebar />
        <BrowserRouter className="bodyFrame">
          <Routes>
            <Route path="/" element={<LogiInPage />} />
            <Route path="/main" element={<DashBoard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
