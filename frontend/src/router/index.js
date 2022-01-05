import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Instargram from "@/views/Instargram.vue";

import Member from "@/views/Member.vue";
import MemberLogin from "@/components/user/MemberLogin.vue";
import MemberJoin from "@/components/user/MemberJoin.vue";
import MemberMyPage from "@/components/user/MemberMyPage.vue";
import MemberUpdate from "@/components/user/MemberUpdate.vue";

import Board from "@/views/Board.vue";
import BoardList from "@/components/board/BoardList.vue";
import BoardWrite from "@/components/board/BoardWrite.vue";
import BoardView from "@/components/board/BoardView.vue";
import BoardUpdate from "@/components/board/BoardUpdate.vue";

import QnA from "@/views/QnA.vue";
import QnAList from "@/components/qna/QnAList.vue";
import QnAWrite from "@/components/qna/QnAWrite.vue";
import QnAView from "@/components/qna/QnAView.vue";
import QnAUpdate from "@/components/qna/QnAUpdate.vue";
import QnADelete from "@/components/qna/QnADelete.vue";
import QnAAnswer from "@/components/qna/QnAAnswer.vue";

import Chart from "@/views/Chart.vue";
import VueChartJS from "@/components/chart/VueChartJS.vue";

import House from "@/views/House.vue";

import store from "@/store/index.js";

// Corona
import Corona from "@/views/Corona.vue";

Vue.use(VueRouter);

// https://router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const getUserInfo = store._actions["memberStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "SignIn" });
    router.push({ name: "SignIn" });
  } else {
    console.log("로그인 했다.");
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/instargram",
    name: "Instargram",
    component: Instargram,
  },
  {
    path: "/user",
    name: "Member",
    component: Member,
    children: [
      {
        path: "singin",
        name: "SignIn",
        component: MemberLogin,
      },
      {
        path: "singup",
        name: "SignUp",
        component: MemberJoin,
      },
      {
        path: "mypage",
        name: "MyPage",
        beforeEnter: onlyAuthUser,
        component: MemberMyPage,
      },
      {
        path: "myupdate",
        name: "MyUpdate",
        beforeEnter: onlyAuthUser,
        component: MemberUpdate,
      },
    ],
  },
  {
    path: "/board",
    name: "Board",
    component: Board,
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "BoardList",
        component: BoardList,
      },
      {
        path: "write",
        name: "BoardWrite",
        beforeEnter: onlyAuthUser,
        component: BoardWrite,
      },
      {
        path: "detail/:articleno",
        name: "BoardView",
        beforeEnter: onlyAuthUser,
        component: BoardView,
      },
      {
        path: "update/:articleno",
        name: "BoardUpdate",
        beforeEnter: onlyAuthUser,
        component: BoardUpdate,
      },
    ],
  },
  {
    path: "/house",
    name: "House",
    component: House,
  },
  {
    path: "/question",
    name: "QnA",
    // beforeEnter: onlyAuthUser,
    component: QnA,
    redirect: "/question/list",
    children: [
      {
        path: "list",
        name: "QnAList",
        beforeEnter: onlyAuthUser,
        component: QnAList,
      },
      {
        path: "write",
        name: "QnAWrite",
        beforeEnter: onlyAuthUser,
        component: QnAWrite,
      },
      {
        path: "detail/:articleno",
        name: "QnAView",
        beforeEnter: onlyAuthUser,
        component: QnAView,
      },
      {
        path: "update/:articleno",
        name: "QnAUpdate",
        beforeEnter: onlyAuthUser,
        component: QnAUpdate,
      },
      {
        path: "delete/:articleno",
        name: "QnADelete",
        beforeEnter: onlyAuthUser,
        component: QnADelete,
      },
      {
        path: "answer/:articleno",
        name: "QnAAnswer",
        beforeEnter: onlyAuthUser,
        component: QnAAnswer,
      },
    ],
  },
  {
    path: "/chart",
    name: "Chart",
    component: Chart,
    redirect: "/chart/chartjs",
    children: [
      {
        path: "chartjs",
        name: "VueChartJS",
        component: VueChartJS,
      },
    ],
  },
  {
    path: "/corona",
    name: "Corona",
    component: Corona,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
