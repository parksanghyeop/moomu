import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/moomu_logo.jpg";
import "./ContactUs.css";

const ContactUs = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-14 text-primary text-lg">
      <img className="mb-10 m-auto" src={logo} width="180" />
      <div className="flex justify-center items-center mb-2">
        <i className="fa-solid fa-envelope"></i>
        <span className="ml-4">mon2210@naver.com</span>
      </div>
      <div className="flex justify-center items-center">
        <i className="fa-regular fa-phone"></i>
        <span className="ml-4">010-4241-0418</span>
      </div>
      <div className="mt-8">
        <a href="http://pf.kakao.com/_xkxeTXxj/chat">
          <button className="btn btn-sm btn-primary btn-block">
            카카오 채널로 문의하기
          </button>
        </a>
      </div>
      <div>
        <div
          className="mt-4 btn btn-sm btn-block btn-primary btn-outline"
          onClick={() => navigate("/login")}
        >
          <span className="">로그인</span>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
