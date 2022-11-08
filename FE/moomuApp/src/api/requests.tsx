const requests = {
  // 로그인
  login: "users/login",
  logout: "logout",

  // 회원가입
  register: "users/register",
  // 사용자 셔틀버스 조회/수정/삭제
  station: "users/station",
  station_edit: "users/station/edit",
  station_delete: "users/station/dleate",
  // 지역조회
  regions: "regions",
  // 셔틀버스
  shuttlebus: "shuttlebus/bus",
  shuttlebus_notion: "shuttlebus/bus/",

  // 푸시알림 토큰
  expo_token: "users/expo_token",
};

export default requests;
