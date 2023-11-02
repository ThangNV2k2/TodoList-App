import React, { useState, useRef, useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeProvider";
import "../css/Todo.css";

function Todo(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.todo.content);
  const inputRef = useRef();
  const theme = useContext(ThemeContext);
  const {
    todo,
    changeIsCompleted,
    requestUpdate,
    deleteTodoItem,
    editTodoItem,
  } = props;

  const handleDoubleClick = () => setIsEditing(true);
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      editTodoItem(todo.id, e.target.value);
    }
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <div className="todo_input">
          <input
            onKeyDown={handleKeyDown}
            type="text"
            className="input"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            ref={inputRef}
          />
        </div>
      ) : (
        <div className="todo">
          <div className="todo_check">
            <label className="checkbox_item" htmlFor={todo.id}>
              <input
                type="checkbox"
                id={todo.id}
                className="checkbox"
                checked={todo.isCompleted}
                onChange={() => changeIsCompleted(todo.id)}
              />
              <i className="fa-solid fa-check"></i>
            </label>
          </div>
          <div
            className={`div_content ${
              !todo.isCompleted ? theme.theme : "content"
            }`}
            onDoubleClick={handleDoubleClick}
          >
            <p>{todo.content}</p>
            <div className="feature">
              <i
                className="fa-solid fa-pencil"
                onClick={() => requestUpdate(todo.id)}
              ></i>
              <i
                className="fa-solid fa-trash"
                onClick={() => deleteTodoItem(todo.id)}
              ></i>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default Todo;
