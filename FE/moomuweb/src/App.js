import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";

import LogiInPage from "./pages/LogIn";
import DashBoard from "./pages/DashBoard";
import RouteMap from "./pages/RouteMap";
import MenuSidebar from "./componentes/menuSidebar";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <MenuSidebar />
          <Routes className="bodyFrame">
            <Route path="/" element={<LogiInPage />} />
            <Route path="/main" element={<DashBoard />} />
            <Route path="/map" element={<RouteMap />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
