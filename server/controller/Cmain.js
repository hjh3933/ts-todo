const { where } = require("sequelize");
const model = require("../models");
//test용 api
exports.getIndex = (req, res) => {
  res.send("response from api server [GET /api-server]");
};
exports.getUser = (req, res) => {
  res.send("response from api server [GET /api-server/user]");
};

// api
// GET /api-server/todos
exports.getTodos = async (req, res) => {
  try {
    const todoAll = await model.Todo.findAll(); //[{id, text, done},{},{}]
    res.json(todoAll);
  } catch (err) {
    console.log("server error", err);
    res.status(500).send("SERVER ERROR!!, 관리자에게 문의하세요");
  }
};
// POST /api-server/todo
exports.postTodo = async (req, res) => {
  try {
    const { text } = req.body; //id는 자동증가, done은 기본값 false로 설정했음
    await model.Todo.create({
      text,
    });
    res.send({ isSuccess: true });
  } catch (err) {
    console.log("server error", err);
    res.status(500).send("SERVER ERROR!!, 관리자에게 문의하세요");
  }
};
// PATCH /api-server/todo/:todoId
exports.patchTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    await model.Todo.update(
      {
        done: true,
      },
      {
        where: { id: todoId },
      }
    );
    res.send({ isSuccess: true });
  } catch (err) {
    console.log("server error", err);
    res.status(500).send("SERVER ERROR!!, 관리자에게 문의하세요");
  }
};
// DELETE /api-server/todo/:todoId
exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    await model.Todo.destroy({
      where: { id: todoId },
    });

    res.send({ isSuccess: true });
  } catch (err) {
    console.log("server error", err);
    res.status(500).send("SERVER ERROR!!, 관리자에게 문의하세요");
  }
};
