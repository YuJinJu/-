import { apiInstance } from "./index.js";

const api = apiInstance();

function listComment(success, fail) {
  api.get(`/comment`).then(success).catch(fail);
}

function writeComment(comment, success, fail) {
  api.post(`/comment`, JSON.stringify(comment)).then(success).catch(fail);
}

function getComment(cno, success, fail) {
  api.get(`/comment/${cno}`).then(success).catch(fail);
}

function modifyComment(comment, success, fail) {
  api.put(`/comment`, JSON.stringify(comment)).then(success).catch(fail);
}

function deleteComment(cno, success, fail) {
  api.delete(`/comment/${cno}`).then(success).catch(fail);
}

export { listComment, writeComment, getComment, modifyComment, deleteComment };
