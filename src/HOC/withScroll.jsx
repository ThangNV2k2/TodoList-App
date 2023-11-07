import React, { useState, useEffect } from "react";

export const withScroll = (WrappedComponent) => {
  let isGetting = false;
  const ref = React.createRef();
  return (props) => {
    const { numberTodoInit, todoList, endScrollPosition } = props;
    const [numberTodo, setNumberTodo] = useState(numberTodoInit);
    const [loadingState, setLoadingState] = useState(false);
    useEffect(() => {
      const handleScroll = () => {
        if (
          ref.current.scrollTop + ref.current.clientHeight >=
            ref.current.scrollHeight - endScrollPosition &&
          !isGetting
        ) {
          isGetting = true;
          if (numberTodo >= todoList.size) {
            return;
          }
          setLoadingState(true);
          setTimeout(() => {
            isGetting = false;
            if (numberTodo >= todoList.size) {
              setNumberTodo(todoList.size);
            } else {
              setNumberTodo(numberTodo + numberTodoInit);
            }
            setLoadingState(false);
          }, 1000);
        }
      };

      ref.current.addEventListener("scroll", handleScroll);
      return () => {
        ref.current.removeEventListener("scroll", handleScroll);
      };
    }, [numberTodo, todoList, endScrollPosition, numberTodoInit]);

    return (
      <WrappedComponent
        ref={ref}
        numberTodo={numberTodo}
        loadingState={loadingState}
        {...props}
      />
    );
  };
};
