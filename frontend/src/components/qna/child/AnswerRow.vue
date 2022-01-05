<template>
  <b-row class="mb-1">
    <b-col>
      <b-card
        :header-html="`<div><h6>${userid}님의 답변</div><div>${answertime}</h6></div>`"
        class="mb-2"
        border-variant="dark"
        no-body
      >
        <b-card-body class="text-left">
          <div v-html="message">${answer}</div>
        </b-card-body>
        <comment-row
          v-for="(comment, index) in comments"
          :key="index"
          v-bind="comment"
        ></comment-row>
        <b-form-input
          id="comment"
          v-if="isComment"
          v-model="comment.comment"
          type="text"
          required
          placeholder="제목 입력..."
          @keyup.enter="writeComment"
        ></b-form-input>
        <b-button size="sm" @click="setComment">댓글쓰기</b-button>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
// import moment from "moment";
import { writeComment, getComment } from "@/api/comment.js";
import CommentRow from "@/components/qna/child/CommentRow";
export default {
  name: "AnswerRow",
  data() {
    return {
      isComment: false,
      comment: {
        cno: null,
        userid: null,
        comment: "",
        comment_time: null,
        ano: null,
      },
      comments: [],
    };
  },
  props: {
    ano: Number,
    userid: String,
    answer: String,
    answertime: String,
  },
  components: {
    CommentRow,
  },
  created() {
    this.listComment();
  },
  computed: {
    message() {
      if (this.answer) return this.answer.split("\n").join("<br>");
      return "";
    },
  },
  methods: {
    setComment() {
      if (this.isComment && this.comment.comment !== "") {
        this.writeComment();
        this.isComment = false;
      } else if (this.isComment) this.isComment = false;
      else this.isComment = true;
      return;
    },
    writeComment() {
      if (this.comment === "") return;
      this.comment.userid = this.userid;
      this.comment.ano = this.ano;
      console.log(this.comment);
      writeComment(
        {
          userid: this.comment.userid,
          comment: this.comment.comment,
          ano: this.comment.ano,
        },
        (response) => {
          console.log(response);
          if (response.data === "success") {
            this.listComment();
          }
        },
        (error) => {
          console.log(error);
        }
      );
      // http
      //   .post(`/comment`, {
      //     userid: this.comment.userid,
      //     comment: this.comment.comment,
      //     ano: this.comment.ano,
      //   })
      //   .then(({ data }) => {
      //     if (data === "success") {
      //       this.listComment();
      //     }
      //   });
      this.comment.comment = "";
    },
    listComment() {
      let ano = this.ano;
      console.log(ano);
      getComment(
        ano,
        (response) => {
          this.comments = response.data;
          console.log(this.comments);
        },
        (error) => {
          console.log(error);
        }
      );
      // http.get(`/comment/${ano}`).then(({ data }) => {
      //   this.comments = data;
      //   console.log(this.comments);
      // });
    },
  },
};
</script>
