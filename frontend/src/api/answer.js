import { apiInstance } from "./index.js";

const api = apiInstance();

function listAnswer(success, fail) {
  api.get(`/answer`).then(success).catch(fail);
}

function writeAnswer(answer, success, fail) {
  api.post(`/answer`, JSON.stringify(answer)).then(success).catch(fail);
}

function getAnswer(ano, success, fail) {
  api.get(`/answer/${ano}`).then(success).catch(fail);
}

function modifyAnswer(answer, success, fail) {
  api.put(`/answer`, JSON.stringify(answer)).then(success).catch(fail);
}

function deleteAnswer(ano, success, fail) {
  api.delete(`/answer/${ano}`).then(success).catch(fail);
}

export { listAnswer, writeAnswer, getAnswer, modifyAnswer, deleteAnswer };
