import React, { useState } from "react";

const Input = () => {
  //password type 변경용 state
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });

  //password type 변경하는 함수
  const handlePasswordType = (e) => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };
  return (
    <div>
      <input type={passwordType.type} />
      <span onClick={handlePasswordType}>{passwordType.visible ? <span>숨기기</span> : <span>보이기</span>}</span>
    </div>
  );
};

export default Input;
