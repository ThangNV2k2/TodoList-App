import React, { useState, useRef, useContext } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import Theme from "./components/Theme";
import { ThemeContext } from "./components/ThemeProvider";
import { v4 as uuidv4 } from "uuid";
import { List } from "immutable";
import "./App.css";

export const options = {
  All: "All",
  Active: "Active",
  Completed: "Completed",
};

function App() {
  const [todoList, setTodoList] = useState(List([
    { id: uuidv4(), content: "Học React", isCompleted: false },
    { id: uuidv4(), content: "Học Node", isCompleted: false },
  ]));
  const [myOption, setMyOption] = useState(options.All);
  const headerRef = useRef();
  const numberTodoInit = useRef(4);
  const addTodo = (todo) => setTodoList((prev) => prev.unshift(todo));

  const deleteTodoItem = (id) => setTodoList(todoList.filter((todo) => todo.id !== id));

  const editTodoItem = (id, content) => {
    const todoIndex = todoList.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      const todoUpdate = { ...todoList.get(todoIndex), content };
      setTodoList(todoList.set(todoIndex, todoUpdate));
    }
  };

  const changeIsCompleted = (id) => {
    const newList = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodoList(newList);
  };

  const deleteAllTodoItem = () => setTodoList(todoList.filter((todo) => !todo.isCompleted));

  const changeOption = (option) => setMyOption(option);

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
          changeOption={changeOption}
          deleteAllTodoItem={deleteAllTodoItem}
        />
      </div>
    </div>
  );
}

export default App;
