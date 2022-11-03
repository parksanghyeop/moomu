import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var isEmpty = function (val) {
  if (val === "" || val === undefined || val === null || (val !== null && typeof val === "object" && !Object.keys(val).length)) {
    return true;
  } else {
    return false;
  }
};
const { naver } = window;

export const loadRoute = createAsyncThunk("get route", async (busId) => {
  const location = new naver.maps.LatLng(36.354683, 127.298177);
  const initLoc = { id: 0, stationLatLng: location, staionName: "ssafy", stationId: 0, order: 0 };
  let dummy = [];
  const url = `https://k7b202.p.ssafy.io/api/shuttlebus/bus/${busId.id}`;
  const pget = await axios.get(url);
  for (var loc in pget.data.stations) {
    const data = pget.data.stations[loc];
    const mapLoc = new naver.maps.LatLng(data.lat, data.lng);
    const newItem = { id: loc, stationLatLng: mapLoc, staionName: data.name, stationId: data.id, order: data.order };
    // dummy.push(data);
    dummy.push(newItem);
  }
  return dummy;
});

export const updateRoute = createAsyncThunk("Update Bus Route", async (busId, { getState }) => {
  const state = await getState();
  console.log(state.token);
  const updateUrl = `https://k7b202.p.ssafy.io/api/shuttlebus/station/edit/${busId.id}`;
  let bodyData = [];
  for (let i in state.station.stations) {
    const data = state.station.stations[i];
    bodyData.push({
      bus_id: busId.id,
      name: data.staionName,
      lat: data.stationLatLng._lat,
      lng: data.stationLatLng._lng,
      order: data.order,
      arrived_time: "",
    });
  }
  var config = {
    method: "put",
    url: updateUrl,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${state.token.rawToken.access_token}`,
    },
    body: {
      body: [],
      ...bodyData,
    },
  };
  console.log(config);
  const response = await axios(config);
  console.log(response);
});

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
        const newItem = { stationLatLng: tmpStations[loc], staionName: "testtesttesttest", id: state.stations.length };
        state.stations.push(newItem);
      }
      // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      // console.log(state.stations);
      state.isLoaded = true;
    },
    reload: (state) => {
      state.isLoaded = true;
    },
    staionUp: (state, action) => {
      console.log(action.payload);
      // let currentList = ["apple", "banana", "cherry", "grape"];
      if (action.payload > 0) {
        const item = state.stations.splice(action.payload, 1); // ['banana']
        state.stations.splice(action.payload - 1, 0, item[0]); // [ 'banana', 'apple', 'cherry', 'grape' ]
        state.stations[action.payload].id = action.payload;
        state.stations[action.payload - 1].id = action.payload - 1;
      } else alert("This station is at the top of the list");
    },
    stationDown: (state, action) => {
      console.log(action.payload, state.stations.length);
      if (action.payload < state.stations.length - 1) {
        const item = state.stations.splice(action.payload, 1); // ['banana']
        state.stations.splice(action.payload + 1, 0, item[0]); // [ 'apple', 'cherry', 'banana', 'grape' ]
        state.stations[action.payload].id = action.payload;
        state.stations[action.payload + 1].id = action.payload + 1;
      } else alert("This station is at the bottom of the list");
    },
    deleteStation: (state, action) => {
      const item = state.stations.splice(action.payload, 1);
      for (let i in state.stations) {
        state.stations[i].id = i;
      }
      console.log("This station is deleted", item);
    },
    addStation: (state, action) => {
      const data = action.payload;
      console.log(data);
      const mapLoc = new naver.maps.LatLng(data.lat, data.lng);
      const item = { id: state.stations.length, stationLatLng: mapLoc, staionName: data.name, order: state.stations.length };
      state.stations.push(item);
      console.log("This station is added", item);
    },
  },
  extraReducers: {
    [loadRoute.fulfilled]: (state, { payload }) => {
      // state.stations = [];
      state.stations = payload;
      state.isLoaded = true;
    },
    [updateRoute.fulfilled]: (state, { payload }) => {
      console.log("bus Route is updated");
    },
  },
});

export const { initRoute, reload, stationDown, staionUp, deleteStation, addStation } = staionSlice.actions;
// export const tokenSelector = (state) => state.token.token;
export default staionSlice.reducer;
