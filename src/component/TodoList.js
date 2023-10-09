import { useContext, useState, useMemo } from "react";
import { TodoStateContext } from "../App";
import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = () => {
  const todo = useContext(TodoStateContext);
  
  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  const getSearchResult = () => {
    return search === ""
      ? todo
      : todo.filter((it) => it.content.toLowerCase().includes(search.toLowerCase()));
  }
  
  const analyzeTodo = useMemo(() => {
    const totalCount = todo.length;
    const doneCount = todo.filter((it) => it.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount, doneCount, notDoneCount
    }
  }, [todo]);
  const { totalCount, doneCount, notDoneCount } = analyzeTodo;

  return (
    <div className="TodoList">
      <h4>Todo List</h4>
      <div>
        <div>총 개수: {totalCount}</div>
        <div>완료: {doneCount}</div>
        <div>미완료: {notDoneCount}</div>
      </div>
      <input value={search} onChange={onChangeSearch} className="searchbar" placeholder="검색어를 입력하세요" />
      <div className="list_wrapper">
        {getSearchResult().map((it) => (
          <TodoItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  )
}

TodoList.defaultProps = {
  todo: [],
}

export default TodoList;