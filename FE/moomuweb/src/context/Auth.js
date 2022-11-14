import { createContext, useContext, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../reducers/tokenSlice";
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const RequireAuth = () => {
  const { user } = useSelector((state) => state.token.decoded.role);
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

export const useAxios = async (config) => {
  const dispatch = useDispatch();
  try {
    const response = await axios(config);
    console.log(response);
    return response;
  } catch (error) {
    if (error.response.status === 451) {
      alert("토큰이 만료되었습니다");
      dispatch(logout());
    }
    return error;
  }
};
