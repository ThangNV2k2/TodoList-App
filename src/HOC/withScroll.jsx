import React, { useState, useEffect } from 'react';

export const withScroll = (WrappedComponent) => {
  let isGetting = false;
  return React.forwardRef((props, ref) => {
    const [numberTodo, setNumberTodo] = useState(4);
    const [loadingState, setLoadingState] = useState(false);
    const {todoList} = props;
    useEffect(() => {
      const handleScroll = () => {
        if (
          ref.current.scrollTop + ref.current.clientHeight >=
          ref.current.scrollHeight - 10
        ) {
          if (!isGetting) {
            isGetting = true;
            if (numberTodo >= todoList.length) {
              return;
            }
            setLoadingState(true);
            setTimeout(() => {
              isGetting = false;
              if(numberTodo >= todoList.length) {
                setNumberTodo(todoList.length);
              }
              else {
                setNumberTodo(numberTodo + 4);
              }
              setLoadingState(false);
            }, 1000);
          }
        }
      };

      ref.current.addEventListener('scroll', handleScroll);
      return () => {
        ref.current.removeEventListener('scroll', handleScroll);
      };
    }, [numberTodo, todoList]);

    return <WrappedComponent ref={ref} numberTodo={numberTodo} loadingState={loadingState} {...props} />;
  });
};

