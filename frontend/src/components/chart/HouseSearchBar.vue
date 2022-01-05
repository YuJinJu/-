<template>
  <b-row class="mt-4 mb-4 text-center">
    <!-- <b-col class="sm-3">
      <b-form-input
        v-model.trim="dongCode"
        placeholder="동코드 입력...(예 : 11110)"
        @keypress.enter="sendKeyword"
      ></b-form-input>
    </b-col>
    <b-col class="sm-3" align="left">
      <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
    </b-col> -->
    시도 :
    <b-col class="sm-3">
      <b-form-select
        v-model="sidoCode"
        :options="sidos"
        @change="gugunList"
      ></b-form-select>
    </b-col>
    구군 :
    <b-col class="sm-3">
      <b-form-select v-model="gugunCode" :options="guguns"></b-form-select>
    </b-col>
    기간(최근 x개월) :
    <b-col class="sm-3">
      <b-form-select v-model="period" :options="periods"></b-form-select>
    </b-col>

    <b-button variant="outline-primary" @click="searchApt">조회</b-button>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { getMonthList } from "@/api/chart.js";
/*
  namespaced: true를 사용했기 때문에 선언해줍니다.
  index.js 에서 modules 객체의 '키' 이름입니다.

  modules: {
    키: 값
    memberStore: memberStore,
    houseStore: houseStore
  }
*/
const houseStore = "houseStore";
const chartStore = "chartStore";

export default {
  name: "HouseSearchBar",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      periods: [3, 6, 9, 12],
      period: 3,
      datanum: 10,
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns"]),
    ...mapState(chartStore, ["houses", "period"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(houseStore, ["getSido", "getGugun"]),
    ...mapActions(chartStore, ["getHouseList"]),
    ...mapMutations(houseStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST"]),

    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchApt() {
      console.log(this.gugunCode);
      if (!this.sidoCode || !this.gugunCode) {
        alert("조회할 지역을 선택해주세요.");
        return;
      }

      let month_list = getMonthList(this.period);
      console.log(month_list);
      const param = {
        dates: month_list,
        gugunCode: this.gugunCode,
      };
      this.getHouseList(param);
    },
  },
};
</script>

<style></style>
