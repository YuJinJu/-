<template>
  <b-container class="bv-example-row mt-3 text-center">
    <!-- 제목 -->
    <h3 class="underline-orange">
      <b-icon icon="house-fill"></b-icon>
      코로나-19관련 병원정보
    </h3>
    <!-- select box -->
    <b-row class="mt-4 mb-4 text-center">
      <b-col class="sm-3">
        <b-form-select
          v-model="sidoNm"
          @change="selected"
          :options="options"
        ></b-form-select>
        <!-- <b-form-select v-model="sidoNm" @change="selected" :options="options"></b-form-select> -->
        <!--<b-form-select v-model="sidoNm" :options="options" size="sm" class="mt-3"></b-form-select>
            <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>-->
      </b-col>

      <b-button variant="outline-primary" @click="search">조회</b-button>
    </b-row>

    <br />

    <!-- data table -->
    <b-table-simple hover responsive>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>시도명</b-th>
          <b-th>시군구명</b-th>
          <b-th>기관명</b-th>
          <b-th>전화번호</b-th>
        </b-tr>
      </b-thead>
      <tbody>
        <!-- 하위 component인 ListRow에 데이터 전달(props) -->
        <b-tr v-for="(hospital, index) in hlist2" :key="index">
          <b-td>{{ hospital.sidoNm }}</b-td>
          <b-td>{{ hospital.sgguNm }}</b-td>
          <b-td>{{ hospital.yadmNm }}</b-td>
          <b-td>{{ hospital.telno }}</b-td>
        </b-tr>
      </tbody>
    </b-table-simple>
  </b-container>
</template>

<script>
// import Vue from 'vue';
import axios from "axios";

//import BootstrapVue from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

//Vue.use(BootstrapVue)
//import CoronaSearchBar from "@/components/Corona/CoronaSearchBar.vue";
//import CoronaList from "@/components/Corona/CoronaList.vue";

export default {
  name: "Corona",
  //components: {
  //CoronaSearchBar,
  //CoronaList,
  //},
  data() {
    return {
      hlist: [],
      hlist2: [],
      //gubun : ""
      //sidos: [],
      sidoNm: null,
      options: [{ value: null, text: "병원목록을 조회할 시도명을 선택하세요" }],
    };
  },

  created() {
    const API_KEY =
      "Mk6fLutuP%2B%2B1yxBbMpL%2FWPaSg0BMc%2BXLBhezpr6kfaQ1ONg%2FLn%2FjbvVjnH8Ae6YgRw%2F2Ggzxam6iiGXOpKJHuQ%3D%3D";
    const SERVICE_URL =
      "http://apis.data.go.kr/B551182/pubReliefHospService/getpubReliefHospList?pageNo=1&numOfRows=256&spclAdmTyCd=A0&ServiceKey=" +
      API_KEY;

    axios.get(SERVICE_URL).then((response) => {
      console.log(response);
      this.hlist = response.data.response.body.items.item;
      //this.gubun = response.data.response.body.items.item.spclAdmTyCd;
      console.log(this.hlist);
      console.log(this.gubun);

      let mySet = new Set();
      for (let index = 0; index < this.hlist.length; index++) {
        mySet.add(this.hlist[index].sidoNm);
      }
      console.log(mySet);

      for (let index of mySet) {
        //const element = array[index];
        this.options.push({ value: index, text: index });
      }
    });
  },

  methods: {
    selected() {
      // @change
      if (this.sidoNm == null) {
        alert("시도명을 선택하세요");
      }
      console.log(this.sidoNm);
    },

    search() {
      // @click

      this.hlist2 = [];

      if (this.sidoNm == null) {
        alert("시도명을 선택하세요");
      }

      // hlist 돌면서 sidoData 만 가져옴
      for (let index = 0; index < this.hlist.length; index++) {
        let sidoData = this.hlist[index].sidoNm;

        // select box 에서 선택한 sidoNm 과
        // hlist의 sidoData가 같으면
        if (sidoData == this.sidoNm) {
          this.hlist2.push(this.hlist[index]);
        }
      }
    },
  },
};
</script>

<style scoped>
.map {
  margin: auto;
}
.underline-orange {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(207, 126, 5, 0.541) 30%
  );
}
</style>
