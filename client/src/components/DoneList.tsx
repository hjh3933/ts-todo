import { useSelector } from "react-redux";
import { ReduxState } from "../types/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DoneList() {
  const lists = useSelector((state: ReduxState) => state.todo.list);
  const doneList = lists.filter((list) => {
    return list.done === true;
  });
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
                <FontAwesomeIcon icon={faTrash} className="trashIcon" />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
