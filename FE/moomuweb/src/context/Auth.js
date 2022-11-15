import { createContext, useContext, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  asyncSessionStorage.getItem("accessToken").then((token) => {
    // console.log("인증시 토큰정보", token);
    if (token === null || token === undefined) {
      navigate("/login");
    } else {
      return <Outlet />;
    }
  });
  return <Outlet />;
};
