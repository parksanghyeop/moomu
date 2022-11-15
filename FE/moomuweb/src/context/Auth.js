import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../reducers/tokenSlice";

const asyncSessionStorage = {
  setItem: function (key, value) {
    return Promise.resolve().then(function () {
      sessionStorage.setItem(key, value);
    });
  },
  getItem: function (key) {
    return Promise.resolve().then(function () {
      return sessionStorage.getItem(key);
    });
  },
};

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const RequireAuth = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  asyncSessionStorage.getItem("accessToken").then((token) => {
    // console.log("인증시 토큰정보", token);
    if (token === null || token === undefined) {
      navigate("/login");
    } else {
      if (location.pathname === "/") {
        navigate("/main");
      } else {
        return <Outlet />;
      }
    }
  });
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
      // dispatch(logout());
    }
    return error;
  }
};
