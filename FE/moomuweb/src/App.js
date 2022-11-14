import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { reload } from "./reducers/stationSlice";
import store from "./store/store.js";
import { AuthProvider, RequireAuth } from "./context/Auth";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import LogiInPage from "./pages/LogIn";
import DashBoard from "./pages/DashBoard";
import RouteMap from "./pages/RouteMap";
import RouteMapChange from "./pages/RouteMapChange";
import NoticeBoard from "./pages/NoticeBoard";
import NoticeWriting from "./pages/NoticeWriting";
import NoticeDeatil from "./pages/NoticeDeatil";
import QuestionBoard from "./pages/QuestionBoard";
import AnswerQuestion from "./pages/QuestionAnswer";
import QuestionDeatil from "./pages/QuestionDeatil";
import UserBoard from "./pages/UserBoard";
import MenuSidebar from "./componentes/menuSidebar";
import ContactUs from "./pages/ContactUs";
const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <div className="App">
            <BrowserRouter>
              <MenuSidebar />
              <Routes className="bodyFrame">
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/login" element={<LogiInPage />} />
                <Route path="" element={<RequireAuth />}>
                  <Route path="/main" element={<DashBoard />} />
                  <Route path="/map" element={<RouteMap />} />
                  <Route path="/notice" element={<NoticeBoard />} />
                  <Route path="/notice/new" element={<NoticeWriting />} />
                  <Route path="/notice/:id" element={<NoticeDeatil />} />
                  <Route path="/users" element={<UserBoard />} />
                  <Route path="/faq" element={<QuestionBoard />} />
                  <Route path="/faq/new" element={<AnswerQuestion />} />
                  <Route path="/faq/:id" element={<QuestionDeatil />} />
                  <Route
                    path="/map/:id"
                    onLeave={reload()}
                    element={<RouteMapChange />}
                  ></Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
