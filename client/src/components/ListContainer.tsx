import DoneList from "./DoneList";
import TodoList from "./TodoList";

export default function ListContainer() {
  return (
    <div className="ListContainer">
      <h2 className="mainTitle">Today Planning</h2>
      <TodoList />
      <DoneList />
    </div>
  );
}
