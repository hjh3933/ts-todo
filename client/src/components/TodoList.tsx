import { useDispatch, useSelector } from "react-redux";
import { create, done } from "../store/module/todo";
import { useRef } from "react";
import { ReduxState } from "../types/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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
  const createTodo = () => {
    if (nextID && todoRef.current) {
      dispatch(
        create({
          id: nextID,
          text: todoRef.current.value,
        })
      );
      todoRef.current.value = "";
    }
  };
  const addTodo = () => {
    //onClick시 axios요청 보내서 db수정
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
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              <span>{todo.text}</span>
              {/* <button onClick={() => dispatch(done(todo.id))}>DONE</button> */}
              {/* check표시 아이콘으로 변경하고 싶어 */}
              <FontAwesomeIcon
                icon={faCheck}
                onClick={() => dispatch(done(todo.id))}
                className="checkIcon"
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
