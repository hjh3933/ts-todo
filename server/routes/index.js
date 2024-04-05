const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

// GET /api-server
router.get("/", controller.getIndex);
// GET /api-server/todos
// 전체 todo데이터 불러오기 >> FRONT로 배열 반환
router.get("/todos", controller.getTodos);
// POST /api-server/todo
// 새로운 TODO만들기 >> {isSuccess: true}
router.post("/todo", controller.postTodo);
// PATCH /api-server/todo/:todoId
// done값 수정(할일 > 다한일) + (다한일 > 할일)
router.patch("/todo/:todoId", controller.getIndex);
// DELETE /api-server/todo/:todoId
// 특정 todo삭제
router.delete("/todo/:todoId", controller.getIndex);

module.exports = router;
