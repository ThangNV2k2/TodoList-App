import React, { useState, useEffect, useContext } from 'react';
import { options } from '../App';
import { ThemeContext } from './ThemeProvider';
import '../css/Footer.css';

function Footer(props) {
  const [cntTodo, setCntTodo] = useState(0);
  const { todoList, deleteAllTodoItem, myOption, setMyOption } = props;
  const theme = useContext(ThemeContext);
  
  useEffect(() => {
    let cnt = 0;
    todoList.forEach((e) => {
      if (!e.isCompleted) {
        cnt++;
      }
    });
    setCntTodo(cnt);
  }, [todoList]);

  return (
    <div className={`Footer ${theme.theme}`}>
      {todoList.length > 0 && (
        <div className="Footer--left">
          <p>{cntTodo} items left</p>
          <div className="btns">
            <button className={`btn ${myOption === options.All ? 'act' : ''}`} onClick={() => setMyOption(options.All)}>
              All
            </button>
            <button className={`btn ${myOption === options.Active ? 'act' : ''}`} onClick={() => setMyOption(options.Active)}>
              Active
            </button>
            <button
              className={`btn ${myOption === options.Completed ? 'act' : ''}`}
              onClick={() => setMyOption(options.Completed)}
            >
              Completed
            </button>
          </div>
        </div>
      )}
      <div className="Footer--right">
        {todoList.length - cntTodo > 0 && (
          <button className="clearBtn" onClick={deleteAllTodoItem}>
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}

export default Footer;
