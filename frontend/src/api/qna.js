import { apiInstance } from "./index.js";

const api = apiInstance();

function listQuestion(success, fail) {
  api.get(`/question`).then(success).catch(fail);
}

function writeQuestion(question, success, fail) {
  api.post(`/question`, JSON.stringify(question)).then(success).catch(fail);
}

function getQuestion(qno, success, fail) {
  api.get(`/question/${qno}`).then(success).catch(fail);
}

function modifyQuestion(question, success, fail) {
  api.put(`/question`, JSON.stringify(question)).then(success).catch(fail);
}

function deleteQuestion(qno, success, fail) {
  api.delete(`/question/${qno}`).then(success).catch(fail);
}

export {
  listQuestion,
  writeQuestion,
  getQuestion,
  modifyQuestion,
  deleteQuestion,
};
