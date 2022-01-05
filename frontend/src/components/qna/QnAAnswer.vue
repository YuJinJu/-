<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>답변하기</h3></b-alert>
      </b-col>
    </b-row>
    <qna-write-form type="answer" />
  </b-container>
</template>

<script>
import QnaWriteForm from "./child/QnAWriteForm.vue";

export default {
  name: "QnAAnswer",
  components: {
    QnaWriteForm,
  },
};
</script>

<style></style>
