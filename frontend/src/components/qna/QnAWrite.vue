<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글작성</h3></b-alert>
      </b-col>
    </b-row>
    <qna-write-form type="register" />
  </b-container>
</template>

<script>
import QnaWriteForm from "./child/QnAWriteForm.vue";

export default {
  name: "QnAWrite",
  components: {
    QnaWriteForm,
  },
};
</script>

<style></style>
