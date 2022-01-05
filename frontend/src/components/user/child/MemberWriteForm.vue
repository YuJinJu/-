<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left" @submit="onSubmit">
            <b-form-group label="이름" label-for="username">
              <b-form-input
                id="username"
                v-model="registform.username"
                required
                placeholder="이름"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="아이디:" label-for="userid">
              <b-form-input
                id="userid"
                v-model="registform.userid"
                :disabled="isUserid"
                required
                :rules="test"
                placeholder="아이디 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="registform.userpwd"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호확인:" label-for="userpwdchk">
              <b-form-input
                type="password"
                id="userpwdchk"
                v-model="registform.userpwdchk"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="email:" label-for="email">
              <b-form-input
                type="text"
                id="email"
                v-model="registform.email"
                required
                placeholder="이메일 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group v-if="this.type === 'register'">
              <b-button
                type="button"
                variant="primary"
                class="m-1"
                @click="moveLogin"
                >취소</b-button
              >
              <b-button type="submit" variant="success" class="m-1-"
                >회원가입</b-button
              >
            </b-form-group>
            <b-form-group v-else-if="this.type === 'modify'">
              <b-button
                type="button"
                variant="primary"
                class="m-1"
                @click="moveMypage"
                >취소</b-button
              >
              <b-button type="submit" variant="success" class="m-1-"
                >수정</b-button
              >
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { registMember, modifyMember } from "@/api/member.js";
import { mapState, mapMutations } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberJoin",
  data() {
    return {
      registform: {
        username: "",
        userid: "",
        userpwd: "",
        userpwdchk: "",
        email: "",
      },
      isUserid: false,
      test: [
        (v) => !!v || `아이디는 필수`,
        (v) => /^[a-zA-Z0-9]*$/.test(v) || "아이디는 영문숫자만",
        (v) => !(v && v.length >= 15) || "아이디는 15자 이상 안돼",
        (v) => this.checkDup(v),
      ],
    };
  },

  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },

  props: {
    type: { type: String },
  },

  created() {
    if (this.type === "modify") {
      (this.registform.username = this.userInfo.username),
        (this.registform.userid = this.userInfo.userid),
        (this.registform.userpwd = this.userInfo.userpwd),
        (this.registform.email = this.userInfo.email);
      this.isUserid = true;
    }

    // if (this.type === "modify") {
    //   this.$route.params.userid,
    //     ({ data }) => {
    //       this.user = data;
    //       console.log(this.user);
    //     },
    //     (error) => {
    //       console.log(error);
    //     };
    // }
  },

  actions: {
    // async testfunction() {
    //   let data = await findById(
    //     this.$route.params.registform.userid,
    //     ({ data }) => {
    //       this.test = data;
    //       console.log(this.test);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    //   console.log(data);
    // },
  },

  methods: {
    // async testfunction() {
    //   await console.log(this.registform.userid);
    // },

    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";

      !this.registform.username &&
        ((msg = "이름을 입력해주세요"),
        (err = false),
        this.$refs.username.focus());
      err &&
        !this.registform.username &&
        ((msg = "아이디를 입력해주세요"),
        (err = false),
        this.$refs.userid.focus());
      err &&
        !this.registform.userpwd &&
        ((msg = "비밀번호를 입력해주세요"),
        (err = false),
        this.$refs.userpwd.focus());
      err &&
        !this.registform.userpwdchk &&
        ((msg = "비밀번호확인을 입력해주세요"),
        (err = false),
        this.$refs.userpwdchk.focus());
      err &&
        !this.registform.email &&
        ((msg = "이메일을 입력해주세요"),
        (err = false),
        this.$refs.email.focus());

      if (!err) {
        alert(msg);
      } else if (this.registform.userpwd != this.registform.userpwdchk) {
        alert("입력한 비밀번호가 다릅니다");
      } else if (this.type === "register") {
        this.registmember();
      } else if (this.type === "modify") {
        this.modifymember();
      }
    },

    registmember() {
      registMember(
        {
          username: this.registform.username,
          userid: this.registform.userid,
          userpwd: this.registform.userpwd,
          email: this.registform.email,
        },
        ({ data }) => {
          let msg = "회원가입 중 문제가 발생했습니다";
          if (data === "success") {
            msg = "회원가입이 완료되었습니다.";
          }
          alert(msg);
          this.moveLogin();
        },
        (error) => {
          console.log(error);
        }
      );
    },

    modifymember() {
      modifyMember(
        {
          username: this.registform.username,
          userid: this.registform.userid,
          userpwd: this.registform.userpwd,
          email: this.registform.email,
        },
        ({ data }) => {
          let msg = "회원정보 수정중 문제가 발생했습니다";
          if (data === "success") {
            msg = "회원정보 수정이 완료되었습니다.";
          }
          alert(msg);
          this.moveReLogin();
        },
        (error) => {
          console.log(error);
        }
      );
    },

    moveLogin() {
      this.$router.push({ name: "SignIn" });
    },
    moveMypage() {
      this.$router.push({ name: "MyPage" });
    },
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),

    moveReLogin() {
      alert("다시 로그인 해주세요");
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      if (this.$route.path != "/") this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style></style>
