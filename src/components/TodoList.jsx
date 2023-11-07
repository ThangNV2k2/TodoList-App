import React, { useContext } from "react";
import Todo from "./Todo";
import { options } from "../App";
import { ThemeContext } from "./ThemeProvider";
import "../css/TodoList.css";
import { withScroll } from "../HOC/withScroll";
import propsTypes from "prop-types";

const TodoList = React.forwardRef((props, ref) => {
  const {
    todoList,
    myOption,
    editTodoItem,
    changeIsCompleted,
    deleteTodoItem,
    requestUpdate,
    numberTodo,
    loadingState,
  } = props;

  const displayTodoList = () => {
    const todoListDisplay = [];
    for (let i = 0; i < numberTodo; i++) {
      if (
        todoList.get(i) &&
        todoList.get(i).id &&
        (myOption === options.All ||
          (myOption === options.Active && !todoList.get(i).isCompleted) ||
          (myOption === options.Completed && todoList.get(i).isCompleted))
      ) {
        todoListDisplay.push(
          <Todo
            key={todoList.get(i).id}
            todo={todoList.get(i)}
            editTodoItem={editTodoItem}
            changeIsCompleted={changeIsCompleted}
            deleteTodoItem={deleteTodoItem}
            requestUpdate={requestUpdate}
          />
        );
      }
    }
    return todoListDisplay;
  };

  const theme = useContext(ThemeContext);

  return (
    <div className={`${theme.theme}`}>
      <ul
        className="todo-list"
        ref={ref}
        style={{ maxHeight: "200px", overflowY: "scroll" }}
      >
        {displayTodoList()}
      </ul>
      {loadingState ? <p className="loading">Loading more todo...</p> : ""}
    </div>
  );
});

TodoList.propTypes = {
  todoList: propsTypes.object,
  myOption: propsTypes.string,
  editTodoItem: propsTypes.func,
  changeIsCompleted: propsTypes.func,
  deleteTodoItem: propsTypes.func,
  requestUpdate: propsTypes.func,
  numberTodo: propsTypes.number,
  loadingState: propsTypes.bool,
}
export default withScroll(TodoList);
