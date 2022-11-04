import { createSlice } from "@reduxjs/toolkit";

var isEmpty = function (val) {
  if (val === "" || val === undefined || val === null || (val !== null && typeof val === "object" && !Object.keys(val).length)) {
    return true;
  } else {
    return false;
  }
};
const { naver } = window;

export const staionSlice = createSlice({
  name: "staionSlice",
  initialState: { routeName: "", stations: [], isLoaded: false },
  reducers: {
    initRoute: (state) => {
      state.routeName = "";
      state.stations = [];
      // state.isLoaded = isEmpty(state.stations);
      const location = new naver.maps.LatLng(36.354683, 127.298177);
      const station01 = new naver.maps.LatLng(36.3484, 127.2982);
      const station02 = new naver.maps.LatLng(36.3457, 127.3017);
      const station03 = new naver.maps.LatLng(36.3417, 127.3055);
      const station04 = new naver.maps.LatLng(36.3538, 127.3416);
      const station05 = new naver.maps.LatLng(36.3741, 127.318);
      const station06 = new naver.maps.LatLng(36.3796, 127.318);
      const station07 = new naver.maps.LatLng(36.3841, 127.3203);
      const station08 = new naver.maps.LatLng(36.3917, 127.3151);
      let tmpStations = [location, station01, station02, station03, station04, station05, station06, station07, station08];
      for (var loc in tmpStations) {
        const newItem = { stationLatLng: tmpStations[loc], stationName: "testtesttesttest", id: state.stations.length };
        state.stations.push(newItem);
      }
      // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      // console.log(state.stations);
      state.isLoaded = true;
    },
    reload: (state) => {
      state.isLoaded = true;
    },
  },
});

export const { initRoute, reload } = staionSlice.actions;
// export const tokenSelector = (state) => state.token.token;
export default staionSlice.reducer;
