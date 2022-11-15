import { createContext, useContext, useState, useCallback } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../reducers/tokenSlice";
import axios from "axios";

export const useAxios = () => {
  const dispatch = useDispatch();
  const sendAxios = useCallback(async (config) => {
    try {
      const response = await axios(config);
      // console.log(response);
      return response;
    } catch (error) {
      if (error.response.status === 451) {
        alert("토큰이 만료되었습니다");
        dispatch(logout());
        return error;
      } else {
        alert(error.response);
        return error;
      }
    }
  }, []);
  return sendAxios;
};
