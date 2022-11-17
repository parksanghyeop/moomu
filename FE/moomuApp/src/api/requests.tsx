const requests = {
    // 로그인
    login: 'users/login',
    logout: 'logout',
    //회원정보수정
    modify: 'users/profile/edit',
    // 회원탈퇴
    withdraw: 'users/profile/delete',
    // 회원가입
    register: 'users/register',
    // 사용자 셔틀버스 조회/수정/삭제
    station: 'users/station',
    station_edit: 'users/station/edit',
    station_delete: 'users/station/delete',
    // 지역조회
    regions: 'regions',
    // 셔틀버스
    shuttlebus: 'shuttlebus/bus',
    shuttlebus_notion: 'shuttlebus/bus/',
    polyline: 'shuttlebus/station/polyline',

    // 푸시알림 토큰
    expo_token: 'users/expo_token',
};

export default requests;
