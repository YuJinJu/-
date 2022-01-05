import { houseList } from "@/api/chart.js";
const chartStore = {
  namespaced: true,
  state: {
    houses: [],
    house: null,
    period: null,
    chart1data: null, // instantiating datacollection with null
    chart2data: null, // instantiating datacollection with null
    chart3data: null, // instantiating datacollection with null
    chart4data: null, // instantiating datacollection with null
  },

  getters: {},

  mutations: {
    SET_HOUSE_LIST: (state, houses) => {
      // console.log(houses);
      for (let i = 0; i < houses.length; i++) {
        state.houses.push(houses[i]);
      }
      console.log(state.houses.length);
    },
    SET_DETAIL_HOUSE: (state, house) => {
      state.house = house;
    },
    SET_PERIOD: (state, period) => {
      state.period = period;
    },
    SET_DATACOLLECTION1: (state, datacollection) => {
      state.chart1data = datacollection;
      console.log(state.chart1data);
    },
    SET_DATACOLLECTION2: (state, datacollection) => {
      state.chart2data = datacollection;
      console.log(state.chart2data);
    },
    SET_DATACOLLECTION3: (state, datacollection) => {
      state.chart3data = datacollection;
      console.log(state.chart3data);
    },
    SET_DATACOLLECTION4: (state, datacollection) => {
      state.chart4data = datacollection;
      console.log(state.chart4data);
    },
    CLEAR_HOUSES: (state) => {
      state.houses = [];
    },
  },

  actions: {
    getHouseList: ({ commit }, param) => {
      commit("CLEAR_HOUSES");
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
      //   const SERVICE_KEY =
      //     "9Xo0vlglWcOBGUDxH8PPbuKnlBwbWU6aO7%2Bk3FV4baF9GXok1yxIEF%2BIwr2%2B%2F%2F4oVLT8bekKU%2Bk9ztkJO0wsBw%3D%3D";
      let DEAL_YMD = "202110";
      console.log(param);
      let params = {
        LAWD_CD: param.gugunCode,
        DEAL_YMD: DEAL_YMD,
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      console.log(param.dates.length);
      commit("SET_PERIOD", param.dates);
      for (let i = 0; i < param.dates.length; i++) {
        params.DEAL_YMD = param.dates[i];
        console.log(params);
        houseList(
          params,
          (response) => {
            console.log(response);
            const body = response.data.response.body;
            let data;
            if (!Array.isArray(body.items.item)) {
              console.log("한개만 나오라이마리야");
              data = [];
              data.push(body.items.item);
            } else data = body.items.item;
            console.log(data);
            commit("SET_HOUSE_LIST", data);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    detailHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_HOUSE", house);
    },
  },
};

export default chartStore;
