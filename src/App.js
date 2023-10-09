import React, { useMemo, useCallback, useReducer, useRef } from 'react';
import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React todo1",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "React todo2",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "React todo3",
    createdDate: new Date().getTime(),
  }
];

function reducer(state, action){
  switch (action.type){
    case "CREATE": {
      return [action.newItem, ...state];
    }
    case "UPDATE": {
      return state.map((it) => it.id === action.targetId 
        ? {
          ...it, isDone: !it.isDone
          }
        : it
      )
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.targetId)
    }
    default: 
      return state;
  }
}

function App() {
  const idRef = useRef(3);
  const [todo, dispatch] = useReducer(reducer, mockTodo);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      }
    })
    idRef.current += 1;
  }

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId
    })
  }, [])

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId
    })
  },[])

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, [])

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  )
}

export default App;