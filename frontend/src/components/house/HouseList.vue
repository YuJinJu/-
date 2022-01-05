<template>
  <b-container v-if="houses && houses.length != 0" class="bv-example-row mt-3">
    <house-list-row
      v-for="(house, index) in houses"
      :key="index"
      :house="house"
    />
    <b-pagination
      v-model="currentPage"
      :total-rows="pagination.rows"
      :per-page="pagination.perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      @change="searchApt"
    ></b-pagination>
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>주택 목록이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import HouseListRow from "@/components/house/HouseListRow.vue";
import { mapState, mapActions } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseList",
  components: {
    HouseListRow,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(houseStore, ["houses", "pagination"]),
    changePage: function () {
      console.log(this.currentPage);
      // this.searchApt();
      return this.currentPage;
    },
    // houses() {
    //   return this.$store.state.houses;
    // },
  },
  methods: {
    // ...mapState(houseStore, ["pagination"]),
    ...mapActions(houseStore, ["getHouseList"]),
    // changePage() {
    //   console.log(this.currentPage);
    //   this.searchApt();
    // },
    searchApt(pageNum) {
      console.log(pageNum);
      if (!this.pagination.gugunCode) alert("조회할 지역을 선택해주세요.");
      else if (!this.pagination.date) alert("조회할 년-월을 선택해주세요.");
      // console.log(this.currentPage);
      let page = pageNum;
      if (!pageNum) page = this.currentPage;
      const param = {
        page: page,
        date: this.pagination.date,
        rows: this.pagination.perPage,
        gugunCode: this.pagination.gugunCode,
      };
      if (this.pagination.gugunCode) this.getHouseList(param);
    },
  },
};
</script>

<style></style>
