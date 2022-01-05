<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-steelblue"><b-icon icon="house"></b-icon> SSAFY</h3>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-jumbotron
          class="bj"
          bg-variant="muted"
          text-variant="dark"
          border-variant="dark"
        >
          <template #header>내 집 4조 🏡</template>

          <template #lead> happy house 이남수, 유진주 <br /> </template>

          <hr class="my-4" />

          <p>안녕하세요~(●'◡'●)(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧</p>
          <p>SSAFY 6기 광주 6반 <b>남수와 진주</b>의 내집 4조 입니다</p>
          <p>
            <img src="@/assets/home.png" />
          </p>
          <!-- <p>Bootstrap의 <b>table</b> 사용법을 익히게됩니다.</p> -->
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Main",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(243, 177, 55, 0.3) 30%
  );
}
.bj {
  background: #f5d88a40;
}
</style>
