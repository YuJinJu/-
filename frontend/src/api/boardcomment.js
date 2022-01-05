import { apiInstance } from "./index.js";

const api = apiInstance();

function listComment(success, fail) {
  api.get(`/boardcomment`).then(success).catch(fail);
}

function writeComment(comment, success, fail) {
  api.post(`/boardcomment`, JSON.stringify(comment)).then(success).catch(fail);
}

function getComment(cno, success, fail) {
  api.get(`/boardcomment/${cno}`).then(success).catch(fail);
}

function modifyComment(comment, success, fail) {
  api.put(`/boardcomment`, JSON.stringify(comment)).then(success).catch(fail);
}

function deleteComment(cno, success, fail) {
  api.delete(`/boardcomment/${cno}`).then(success).catch(fail);
}

export { listComment, writeComment, getComment, modifyComment, deleteComment };
