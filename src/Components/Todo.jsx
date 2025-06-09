import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteall } from "../features/todos/todoSlice";
import { deletetodo } from '../features/todos/todoSlice'
import { modTodo } from "../features/todos/todoSlice";

const Todo = () => {
  const [item, setItem] = useState({
    data: "",
    completed: false
  });

  const todo = useSelector((state) => state.TODO)

  const dispatch = useDispatch()

  const displaychange = (e) => {
    setItem({
      data: e.target.value,
      completed: false
    });
  };

  const addtodo = () => {
    dispatch(addTodo(item))
    setItem({
      data: "",
      completed: false
    });
    localStorage.setItem("items", JSON.stringify(todo))
  }

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      addtodo();
    }
  }

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todo));
  }, [todo]);

  const Todo = ({ item, i }) => {
    const dispatch = useDispatch()

    return (
      <>
        <div className="tododiv">
          <input className="todoCheck" type="checkbox"
            checked={item.completed}
            onChange={(e) => {
              dispatch(modTodo({
                value: item.data,
                check: e.target.checked,
                id: i
              }))
            }}
          />
          <p className={`${item.completed ? "completedtodo" : "to-do"}`}>{i + 1}.{" "}</p>
          <p className={`${item.completed ? "completedtodo" : "to-do"}`}>
            {item.data}
          </p>
          <p className="deletetodo" onClick={() => dispatch(deletetodo(i))}>X</p>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="bg-gradient-to-b from-white to-blue-300 smooth-entry flex justify-center items-center flex-col h-[80vh] md:mt-0 mt-28">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <input
            type="text"
            value={item.data}
            onChange={displaychange}
            onKeyDown={onEnterPress}
            placeholder="enter your task"
            className="p-4 border min-w-[80%] h-14 rounded-xl m-4 focus:outline-none shadow-[0px_5px_5px_rgba(13,69,77,0.5)]"
          ></input>
          <button className="text-center m-2 px-5" onClick={addtodo}>
            Add
          </button>
          <button className="text-center m-2 px-5" onClick={() => dispatch(deleteall())}>
            Reset
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <p className="mx-5 font-medium">Completed tasks - {todo.filter((i) => i.completed == true).length} </p>
          <p className="mx-5 font-medium">Uncompleted tasks - {todo.length && todo.length - todo.filter((i) => i.completed == true).length} </p>
          <p className="mx-5 font-medium">Total tasks - {todo.length && todo.length}</p>
        </div>
        <div className="todo-display border border-gray-400 text-center mb-20">
          {todo.map((item, i) => {
            return <Todo key={i} item={item} i={i} />
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;
