<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="listArticle">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="article.userid == userInfo.userid">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="removeArticle"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.articleno}.
          ${article.subject} [${article.hit}]</h3><div><h6>${article.userid}</div><div>${article.regtime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
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
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import { getArticle, deleteArticle } from "@/api/board";
import { writeComment, getComment } from "@/api/boardcomment.js";
import CommentRow from "@/components/board/child/CommentRow";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {
      article: {},
      comments: [],
      comment: {
        cno: null,
        userid: null,
        comment: "",
        comment_time: null,
        ano: null,
      },
      isComment: false,
    };
  },
  components: {
    CommentRow,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),

    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
    // changeDateFormat() {
    //   return moment(new Date(this.article.regtime)).format(
    //     "YYYY.MM.DD hh:mm:ss"
    //   );
    // },
  },
  created() {
    getArticle(
      this.$route.params.articleno,
      (response) => {
        this.article = response.data;
      },
      (error) => {
        console.log("삭제시 에러발생!!", error);
      }
    );
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "BoardList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "BoardUpdate",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    removeArticle() {
      if (confirm("정말로 삭제?")) {
        deleteArticle(this.article.articleno, () => {
          this.$router.push({ name: "BoardList" });
        });
      }
    },
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
      this.comment.userid = this.article.userid;
      this.comment.ano = this.article.articleno;
      console.log(this.comment);
      writeComment(
        {
          userid: this.comment.userid,
          comment: this.comment.comment,
          articleno: this.comment.ano,
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
      // let ano = this.ano;
      // console.log(ano);
      getComment(
        this.article.articleno,
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

<style></style>
