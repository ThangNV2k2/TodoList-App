import React, { useState, useRef, useContext } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import Theme from "./components/Theme";
import { ThemeContext } from "./components/ThemeProvider";
import { v4 as uuidv4 } from "uuid";
import { produce } from "immer";
// import { List } from "immutable";
// import { set } from "immutable";
import "./App.css";

export const options = {
  All: "All",
  Active: "Active",
  Completed: "Completed",
};

function App() {
  const [todoList, setTodoList] = useState([
    { id: uuidv4(), content: "Học React", isCompleted: false },
    { id: uuidv4(), content: "Học Node", isCompleted: false },
  ]);
  const [myOption, setMyOption] = useState(options.All);
  const headerRef = useRef();
  const numberTodoInit = useRef(4);
  const addTodo = (todo) => {
    setTodoList(
      produce(todoList, (draft) => {
        draft.unshift(todo);
      })
    );
  };

  const deleteTodoItem = (id) => {
    setTodoList(
      produce(todoList, (draft) => {
        const index = draft.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          draft.splice(index, 1);
        }
      })
    );
  };

  const editTodoItem = (id, content) => {
    setTodoList(
      produce(todoList, (draft) => {
        const index = draft.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          draft[index].content = content;
        }
      })
    );
  };

  const changeIsCompleted = (id) => {
    setTodoList(
      produce(todoList, (draft) => {
        const index = draft.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          draft[index].isCompleted = !draft[index].isCompleted;
        }
      })
    );
  };

  const deleteAllTodoItem = () => {
    setTodoList(
      produce(
        todoList,
        (draft) => (draft = draft.filter((todo) => !todo.isCompleted))
      )
    );
  };

  const requestUpdate = (id, content) =>
    headerRef.current.changeUpdate(id, content);

  const themeContext = useContext(ThemeContext);
  const theme = themeContext.theme;

  return (
    <div className={`container ${theme}`}>
      <Theme />
      <h1>todos</h1>
      <div className="main">
        <Header
          addTodo={addTodo}
          ref={headerRef}
          requestUpdate={requestUpdate}
          editTodoItem={editTodoItem}
        />
        <TodoList
          todoList={todoList}
          myOption={myOption}
          deleteTodoItem={deleteTodoItem}
          editTodoItem={editTodoItem}
          changeIsCompleted={changeIsCompleted}
          requestUpdate={requestUpdate}
          numberTodoInit={numberTodoInit.current}
          endScrollPosition={10}
        />
        <Footer
          todoList={todoList}
          myOption={myOption}
          setMyOption={setMyOption}
          deleteAllTodoItem={deleteAllTodoItem}
        />
      </div>
    </div>
  );
}

export default App;
