<template>
  <section class="container">
    <b-row class="justify-content-md-center">
      <b-button pill variant="primary" @click="fillData()"
        >차트갱신하기</b-button
      >
    </b-row>
    <br />
    <div class="columns"></div>
    <div class="columns">
      <div class="column">
        <h3>월별거래량</h3>
        <line-reactive :chart-data="chart4datacollection"></line-reactive>
      </div>
      <div class="column">
        <h3>동별 아파트 거래량</h3>
        <bar-reactive :chart-data="chart1datacollection"></bar-reactive>
      </div>
      <div class="column">
        <h3>거래유형별 거래량</h3>
        <bar-reactive :chart-data="chart2datacollection"></bar-reactive>
      </div>
      <div class="column">
        <h3>층별 평균거래가</h3>
        <bar-reactive :chart-data="chart3datacollection"></bar-reactive>
      </div>

      <!-- <button class="button is-primary" @click="fillData()">Randomize</button> -->
    </div>
  </section>
</template>
<script>
import BarReactive from "@/components/chart/BarReactive";
import LineReactive from "@/components/chart/LineReactive";

import { mapState } from "vuex";
import {
  getAptDealFrequency,
  dealTypePerDealFrequency,
  floorPerDealAmount,
  monthPerDealFrequency,
} from "@/api/chart.js";
const chartStore = "chartStore";
export default {
  name: "VueChartJS",
  components: {
    BarReactive,
    LineReactive,
  },
  data() {
    return {
      chart1datacollection: null, // instantiating datacollection with null
      chart2datacollection: null, // instantiating datacollection with null
      chart3datacollection: null, // instantiating datacollection with null
      chart4datacollection: null, // instantiating datacollection with null
    };
  },
  computed: {
    ...mapState(chartStore, ["houses", "period"]),
  },
  methods: {
    fillData() {
      this.chart1datacollection = getAptDealFrequency(this.houses);
      this.chart2datacollection = dealTypePerDealFrequency(this.houses);
      this.chart3datacollection = floorPerDealAmount(this.houses);
      this.chart4datacollection = monthPerDealFrequency(
        this.houses,
        this.period
      );
    },
  },
};
</script>
