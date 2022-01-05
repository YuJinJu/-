<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>질문보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="listQuestion"
          >목록</b-button
        >
      </b-col>
      <b-col class="text-right" v-if="question.userid == userInfo.userid">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyQuestion"
          class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteQuestion"
          >글삭제</b-button
        >
        <b-button size="sm" @click="answerQuestion">답변하기</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${question.qno}.
          ${question.subject} [${question.hit}]</h3><div><h6>${question.userid}</div><div>${question.regtime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <answer-row
      v-for="(answer, index) in answers"
      :key="index"
      v-bind="answer"
    />
  </b-container>
</template>

<script>
// import moment from "moment";
import { getQuestion } from "@/api/qna.js";
import { getAnswer } from "@/api/answer.js";
import AnswerRow from "@/components/qna/child/AnswerRow";
import { mapState } from "vuex";

const memberStore = "memberStore";
export default {
  data() {
    return {
      question: {},
      answers: [],
    };
  },
  components: {
    AnswerRow,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.question.content)
        return this.question.content.split("\n").join("<br>");
      return "";
    },
    // changeDateFormat() {
    //   return moment(new Date(this.question.regtime)).format(
    //     "YYYY.MM.DD hh:mm:ss"
    //   );
    // },
  },
  created() {
    getQuestion(
      this.$route.params.qno,
      (response) => {
        this.question = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
    getAnswer(
      this.$route.params.qno,
      (response) => {
        this.answers = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
    // http.get(`/question/${this.$route.params.qno}`).then(({ data }) => {
    //   this.question = data;
    // });
    // http.get(`/answer/${this.$route.params.qno}`).then(({ data }) => {
    //   this.answers = data;
    //   console.log(this.answers);
    // });
  },
  methods: {
    listQuestion() {
      this.$router.push({ name: "QnAList" });
    },
    moveModifyQuestion() {
      console.warn(this.question.qno);
      this.$router.replace({
        name: "QnAUpdate",
        params: { qno: this.question.qno },
      });
      //   this.$router.push({ path: `/QnA/modify/${this.question.questionno}` });
    },
    deleteQuestion() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "QnADelete",
          params: { qno: this.question.qno },
        });
      }
    },
    answerQuestion() {
      this.$router.replace({
        name: "QnAAnswer",
        params: { qno: this.question.qno },
      });
    },
  },
};
</script>

<style></style>
