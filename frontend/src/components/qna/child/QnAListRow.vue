<template>
  <b-tr>
    <b-td>{{ qno }}</b-td>
    <b-th class="text-left">
      <router-link :to="{ name: 'QnAView', params: { qno: qno } }">{{
        subject
      }}</router-link>
    </b-th>
    <b-td>{{ hit }}</b-td>
    <b-td>{{ userid }}</b-td>
    <b-td>{{ regtime }}</b-td>
  </b-tr>
</template>

<script>
// import moment from "moment";

export default {
  name: "QnAListRow",
  props: {
    qno: Number,
    userid: String,
    subject: String,
    hit: Number,
    regtime: String,
  },
  created() {
    console.log(this.question);
  },
  computed: {
    // changeDateFormat() {
    //   return moment(new Date(this.regtime)).format("YY.MM.DD hh:mm:ss");
    // },
  },
};
</script>

<style></style>
