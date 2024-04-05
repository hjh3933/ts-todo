import { useEffect } from "react";
import DoneList from "./DoneList";
import TodoList from "./TodoList";
import axios from "axios";
import { useDispatch } from "react-redux";
import { init } from "../store/module/todo";

export default function ListContainer() {
  const dispatch = useDispatch();
  async function getTodoAll() {
    const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/todos`);
    console.log(res.data);
    if (res.data) {
      dispatch(init(res.data)); //Todo[] 타입의 data를 받는 init액션
    }
  }
  useEffect(() => {
    getTodoAll();
  }, []);
  return (
    <div className="ListContainer">
      <h2 className="mainTitle">Today Planning</h2>
      <TodoList />
      <DoneList />
    </div>
  );
}
