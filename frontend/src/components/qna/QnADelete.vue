<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col><b-alert show variant="danger">삭제처리중...</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { deleteQuestion } from "@/api/qna.js";

export default {
  name: "QnADelete",
  created() {
    if (confirm("정말로 삭제?")) {
      deleteQuestion(this.$route.params.qno, () => {
        this.$router.push({ name: "QnAList" });
      });
    }
    // http.delete(`/question/${this.$route.params.qno}`).then(({ data }) => {
    //   let msg = "삭제 처리시 문제가 발생했습니다.";
    //   if (data === "success") {
    //     msg = "삭제가 완료되었습니다.";
    //   }
    //   alert(msg);
    //   // 현재 route를 /list로 변경.
    //   this.$router.push({ name: "QnAList" });
    // });
  },
};
</script>

<style></style>
