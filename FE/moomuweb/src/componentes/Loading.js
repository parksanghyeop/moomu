import React, { useEffect } from "react";
import { useAxios } from "../context/CustomAxios";

import "../App.css";
export default function LoadingComponent() {
  const token = sessionStorage.getItem("accessToken");

  const customAxios = useAxios();

  useEffect(() => {
    const getRegions = async () => {
      const config = {
        method: "get",
        url: "https://k7b202.p.ssafy.io/api/users/profile",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await customAxios(config);
      return response;
    };
    getRegions();
  }, []);
  return <progress className="progress self-center loading"></progress>;
}
