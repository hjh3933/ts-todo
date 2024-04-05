import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../types/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { init } from "../store/module/todo";

export default function DoneList() {
  const lists = useSelector((state: ReduxState) => state.todo.list);
  const dispatch = useDispatch();
  const doneList = lists.filter((list) => {
    return list.done === true;
  });
  const deleteTodo = async (id: number) => {
    await axios.delete(`${process.env.REACT_APP_API_SERVER}/todo/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/todos`);
    if (res.data) {
      dispatch(init(res.data));
    }
  };
  return (
    <section className="DoneList">
      <h2>Done List</h2>
      {doneList.length === 0 ? (
        <p>완료한 일이 없어요...</p>
      ) : (
        <ul>
          {doneList.map((el) => {
            return (
              <li key={el.id}>
                <span>{el.text}</span>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="trashIcon"
                  onClick={() => deleteTodo(el.id)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
