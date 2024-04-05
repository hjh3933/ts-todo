import { useDispatch, useSelector } from "react-redux";
import { create, done } from "../store/module/todo";
import { useRef } from "react";
import { ReduxState } from "../types/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function TodoList() {
  const lists = useSelector((state: ReduxState) => state.todo.list);
  const dispatch = useDispatch();
  const todoRef = useRef<HTMLInputElement>(null);
  const nextID = useSelector((state: ReduxState) => state.todo.nextID);
  // console.log(lists);
  // console.log(list[0].text); //접근법
  const todoList = lists.filter((list) => {
    return list.done === false;
  });
  const createTodo = async () => {
    if (nextID && todoRef.current) {
      const data = {
        text: todoRef.current.value,
      };
      dispatch(
        create({
          id: nextID,
          text: data.text,
        })
      );
      //axios post
      await axios.post(`${process.env.REACT_APP_API_SERVER}/todo`, data);
      todoRef.current.value = "";
    }
  };
  const changeDone = async (id: number) => {
    //onClick시 axios요청 보내서 db수정
    dispatch(done(id));
    await axios.patch(`${process.env.REACT_APP_API_SERVER}/todo/${id}`);
  };
  return (
    <section className="TodoList">
      <h2>Today Todo</h2>
      <div>
        <input type="text" placeholder="Todo" ref={todoRef} />
        <button onClick={createTodo}>ADD</button>
      </div>
      {/* state관리 예정 */}
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <FontAwesomeIcon
              icon={faCheck}
              onClick={() => changeDone(todo.id)}
              className="checkIcon"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
