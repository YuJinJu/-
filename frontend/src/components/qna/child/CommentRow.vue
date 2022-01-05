<template>
  <b-row class="mb-1">
    <b-col>
      <b-form-text id="input-live-help" size="sm"
        >{{ userid }}님의 댓글 : {{ comment }}</b-form-text
      >
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "CommentRow",
  props: {
    userid: String,
    comment: String,
    comment_time: String,
  },
  created() {
    console.log(this.comment);
    console.log(this.userid);
    console.log(this.comment_time);
  },
};
</script>

<style></style>
