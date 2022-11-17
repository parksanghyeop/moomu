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
  const initLoc = {
    id: 0,
    stationLatLng: location,
    stationName: "ssafy",
    stationId: 0,
    order: 0,
  };
  let dummy = [];
  const busUrl = `https://k7b202.p.ssafy.io/api/shuttlebus/bus/${busId.id}`;
  const dget = await axios.get(busUrl);
  console.log(dget);
  for (var loc in dget.data.stations) {
    const data = dget.data.stations[loc];
    const mapLoc = new naver.maps.LatLng(data.lat, data.lng);
    const newItem = {
      id: loc,
      stationLatLng: mapLoc,
      stationName: data.name,
      stationId: data.id,
      order: data.order,
      arrived_time: data.arrived_time,
    };
    // dummy.push(data);
    dummy.push(newItem);
  }
  const polyUrl = `https://k7b202.p.ssafy.io/api/shuttlebus/station/polyline/${busId.id}`;
  const pget = await axios.get(polyUrl);
  const data = {
    data: dummy,
    poly: pget.data,
    name: dget.data.name,
  };
  return data;
});

export const updateRoute = createAsyncThunk("Update Bus Route", async (busId, { getState }) => {
  const state = await getState();
  // let points = [];
  // for (let loc = 0; loc < state.station.stations.length; loc++) {
  //   const element = state.station.stations[loc].stationLatLng;
  //   points.push(element.x.toString() + "," + element.y.toString());
  // }
  // const start = points[0];
  // const goal = points.slice(-1);
  // var temp = [];
  // for (var i = 1; i < points.length - 1; i++) {
  //   temp.push(points[i]);
  // }
  // const waypoints = temp.join("|");
  // const direction15Url = `/map-direction-15/v1/driving?start=${start}&goal=${goal}&waypoints=${waypoints}&option=trafast`;
  // console.log(direction15Url);

  // const options = {
  //   method: "get",
  //   headers: {
  //     "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_API_KEY_ID,
  //     "X-NCP-APIGW-API-KEY": process.env.REACT_APP_API_KEY,
  //   },
  // };
  // let polyLine = [];
  // await axios(direction15Url, options).then((response) => {
  //   console.log(response.data);
  //   let paths = response.data.route.trafast[0].path;
  //   console.log(polyLine);
  //   paths.map((path) => {
  //     polyLine.push({
  //       bus_id: busId.id,
  //       latitude: path[1],
  //       longitude: path[0],
  //     });
  //   });
  // });
  const updateUrl = `https://k7b202.p.ssafy.io/api/shuttlebus/station/edit/${busId.id}`;
  let bodyData = [];
  for (let i in state.station.stations) {
    const data = state.station.stations[i];
    bodyData.push({
      bus_id: busId.id,
      name: data.stationName,
      lat: data.stationLatLng._lat,
      lng: data.stationLatLng._lng,
      order: data.order,
      arrived_time: data.arrived_time,
    });
  }
  var config = {
    method: "put",
    url: updateUrl,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${state.token.rawToken.access_token}`,
    },
    data: [...bodyData],
    // {
    //   station_list: bodyData,
    //   poly_list: polyLine,
    // },
  };
  console.log(config);
  console.log(state.station.originCopy === state.station.stations);
  const isDataChange = state.station.originCopy === state.station.stations;
  if (!isDataChange) {
    const response = await axios(config);
    console.log(response);
  } else {
    console.log("nothing to update");
  }
});

export const staionSlice = createSlice({
  name: "selectionSlice",
  initialState: {
    routeName: "",
    stations: [],
    poly: [],
    isLoaded: false,
    originCopy: [],
  },
  reducers: {
    initRoute: (state) => {
      state.routeName = "";
      state.poly = [];
    },
    reload: (state) => {
      state.routeName = "";
      state.stations = [];
      state.poly = [];
      state.originCopy = [];
      state.isLoaded = false;
    },
    staionUp: (state, action) => {
      console.log(action.payload);
      // let currentList = ["apple", "banana", "cherry", "grape"];
      if (action.payload > 0) {
        const item = state.stations.splice(action.payload, 1); // ['banana']
        state.stations.splice(action.payload - 1, 0, item[0]); // [ 'banana', 'apple', 'cherry', 'grape' ]
        state.stations[action.payload].id = action.payload;
        state.stations[action.payload].order = action.payload;
        state.stations[action.payload - 1].id = action.payload - 1;
        state.stations[action.payload - 1].order = action.payload - 1;
      } else alert("This station is at the top of the list");
    },
    stationDown: (state, action) => {
      console.log(action.payload, state.stations.length);
      if (action.payload < state.stations.length - 1) {
        const item = state.stations.splice(action.payload, 1); // ['banana']
        state.stations.splice(action.payload + 1, 0, item[0]); // [ 'apple', 'cherry', 'banana', 'grape' ]
        state.stations[action.payload].id = action.payload;
        state.stations[action.payload].order = action.payload;
        state.stations[action.payload + 1].id = action.payload + 1;
        state.stations[action.payload + 1].order = action.payload + 1;
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
      const item = {
        id: state.stations.length,
        stationLatLng: mapLoc,
        stationName: data.name,
        order: state.stations.length,
        arrived_time: data.arrived_time,
      };
      state.stations.push(item);
      console.log("This station is added", item);
    },
    updateStation: (state, action) => {
      const data = action.payload;
      console.log(data);
      state.stations[data.target].stationName = data[0].title;
      state.stations[data.target].arrived_time = data[0].arrived_time;
    },
    setStation: (state, action) => {
      state.stations = action.payload;
    },
  },
  extraReducers: {
    [loadRoute.fulfilled]: (state, { payload }) => {
      // state.stations = [];
      state.stations = payload.data;
      state.originCopy = payload.data;
      state.poly = payload.poly;
      state.routeName = payload.name;
      state.isLoaded = true;
    },
    [updateRoute.fulfilled]: (state, { payload }) => {
      console.log("bus Route is updated");
    },
  },
});

export const { initRoute, reload, stationDown, staionUp, deleteStation, addStation, updateStation, setStation } = staionSlice.actions;
export default staionSlice.reducer;
