import { createContext, useContext, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../reducers/tokenSlice";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();

  const logOut = function () {
    dispatch(logout());
  };

  if (user <= 0) {
    alert("권한 없음");
    logOut();
    return <Navigate to={{ pathname: "/", state: { from: location } }} replace />;
  }

  return <Outlet />;
};
