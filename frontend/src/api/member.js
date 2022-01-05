import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function registMember(registform, success, fail) {
  await api
    .post(`/user/register`, JSON.stringify(registform))
    .then(success)
    .catch(fail);
}

async function modifyMember(user, success, fail) {
  await api.put(`/user`, JSON.stringify(user)).then(success).catch(fail);
}

async function deleteMember(userid, success, fail) {
  api.delete(`/user/${userid}`).then(success).catch(fail);
}

// function logout(success, fail)
export { login, findById, registMember, modifyMember, deleteMember };
