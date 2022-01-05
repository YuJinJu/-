<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="userid-group"
          label="작성자:"
          label-for="userid"
          description="작성자를 입력하세요."
        >
          <b-form-input
            id="userid"
            :disabled="isUserid"
            v-model="article.userid"
            type="text"
            required
            placeholder="작성자 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="subject-group"
          label="제목:"
          label-for="subject"
          description="제목을 입력하세요."
        >
          <b-form-input
            id="subject"
            :disabled="isSubject"
            v-model="article.subject"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="article.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <b-button
          type="submit"
          variant="primary"
          class="m-1"
          v-if="this.type === 'register'"
          >글작성</b-button
        >
        <b-button
          type="submit"
          variant="primary"
          class="m-1"
          v-else-if="this.type === 'answer'"
          >답변하기</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else
          >글수정</b-button
        >
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { getQuestion, writeQuestion, modifyQuestion } from "@/api/qna.js";
import { writeAnswer } from "@/api/answer.js";
import { mapState } from "vuex";
const memberStore = "memberStore";
export default {
  name: "QnAWriteForm",
  data() {
    return {
      article: {
        articleno: 0,
        userid: "",
        subject: "",
        content: "",
      },
      isUserid: false,
      isSubject: false,
    };
  },
  props: {
    type: { type: String },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    console.log(this.type);
    console.log(this.userInfo);
    if (this.type === "modify") {
      getQuestion(
        this.$route.params.qno,
        (response) => {
          this.article = response.data;
        },
        (error) => {
          console.log(error);
        }
      );

      this.isUserid = true;
    } else if (this.type === "answer") {
      getQuestion(
        this.$route.params.qno,
        (response) => {
          this.article = response.data;
          this.article.content = "";
        },
        (error) => {
          console.log(error);
        }
      );

      this.isUserid = true;
      this.isSubject = true;
    } else if (this.type === "register") {
      console.log(this.userInfo);
      this.article.userid = this.userInfo.userid;
      this.isUserid = true;
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.article.userid &&
        ((msg = "작성자 입력해주세요"),
        (err = false),
        this.$refs.userid.focus());
      err &&
        !this.article.subject &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.subject.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) {
        alert(msg);
      } else if (this.type === "register") {
        this.registArticle();
      } else if (this.type === "modify") {
        this.modifyArticle();
      } else {
        this.answerArticle();
      }
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleno = 0;
      this.article.subject = "";
      this.article.content = "";
      this.$router.push({ name: "QnAList" });
    },
    registArticle() {
      console.log(this.type);
      console.log(this.userInfo);
      writeQuestion(
        {
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
        },
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
      // http
      //   .post(`/question`, {
      //     userid: this.article.userid,
      //     subject: this.article.subject,
      //     content: this.article.content,
      //   })
      //   .then(({ data }) => {
      //     let msg = "등록 처리시 문제가 발생했습니다.";
      //     if (data === "success") {
      //       msg = "등록이 완료되었습니다.";
      //     }
      //     alert(msg);
      //     this.moveList();
      //   });
    },
    modifyArticle() {
      modifyQuestion(
        {
          qno: this.article.qno,
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
        },
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push({ name: "QnAList" });
        },
        (error) => {
          console.log(error);
        }
      );
      // http
      //   .put(`/question`, {
      //     qno: this.article.qno,
      //     userid: this.article.userid,
      //     subject: this.article.subject,
      //     content: this.article.content,
      //   })
      //   .then(({ data }) => {
      //     let msg = "수정 처리시 문제가 발생했습니다.";
      //     if (data === "success") {
      //       msg = "수정이 완료되었습니다.";
      //     }
      //     alert(msg);
      //     // 현재 route를 /list로 변경.
      //     this.$router.push({ name: "QnAList" });
      //   });
    },
    answerArticle() {
      console.log(this.article.qno);
      writeAnswer(
        {
          qno: this.article.qno,
          userid: this.article.userid,
          subject: this.article.subject,
          answer: this.article.content,
        },
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
      // http
      //   .post(`/answer`, {
      //     qno: this.article.qno,
      //     userid: this.article.userid,
      //     subject: this.article.subject,
      //     answer: this.article.content,
      //   })
      //   .then(({ data }) => {
      //     let msg = "등록 처리시 문제가 발생했습니다.";
      //     if (data === "success") {
      //       msg = "등록이 완료되었습니다.";
      //     }
      //     alert(msg);
      //     this.moveList();
      //   });
    },
    moveList() {
      this.$router.push({ name: "QnAList" });
    },
  },
};
</script>

<style></style>
