<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <b-container class="bv-example-row mt-3 text-center">
        <b-row>
          <b-col>
            <house-search-bar></house-search-bar>
          </b-col>
        </b-row>
        <router-view></router-view>
      </b-container>
    </div>
  </section>
</template>

<script>
import HouseSearchBar from "@/components/chart/HouseSearchBar.vue";

export default {
  name: "Chart",
  components: {
    HouseSearchBar,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  text-decoration: underline;
}
</style>
