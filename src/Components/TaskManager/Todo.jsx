import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteall } from "../../features/todos/todoSlice";
import { deletetodo } from '../../features/todos/todoSlice'
import { modTodo } from "../../features/todos/todoSlice";
import AddTaskModal from "./addTaskModal";

const Todo = () => {
  const [item, setItem] = useState({
    title: "",
    data: "",
    assignee: "",
    dueDate: '',
    priority: "low",
    completed: false
  });
  const [taskModal, settaskModal] = useState(false)

  const todo = useSelector((state) => state.TODO)

  const dispatch = useDispatch()

  const displaychange = (e) => {
    setItem({
      ...item,
      data: e.target.value,
    });
  };

  const addtodo = () => {
    dispatch(addTodo(item))
    setItem({
      title: "",
      data: "",
      assignee: "",
      dueDate: '',
      completed: false,
      priority: "low"
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
      <div className={`
      ${item.priority == "low" ? "bg-green-300" : item.priority == "medium" ? "bg-orange-300" : "bg-red-300"}
      flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-4 border rounded-xl shadow-md mb-4 w-full max-w-full`}>
        <div className="flex flex-col items-start gap-2 w-full flex-wrap break-words">
          <div className="flex self-start items-center gap-2 w-full sm:w-auto">
            <input
              type="checkbox"
              className="mt-1 sm:mt-0"
              checked={item.completed}
              onChange={(e) => {
                dispatch(modTodo({
                  ...item,
                  check: e.target.checked,
                  id: i
                }))
              }}
            />
            <p className={`font-semibold ${item.completed ? "line-through text-gray-500" : ""}`}>
              {i + 1}. <span className="text-lg break-words"> {item.title}</span>
            </p>
          </div>
          <p className={`${item.completed ? "line-through text-gray-500" : ""}`}>
            <span className="font-semibold">Details:</span> <span className="text-sm break-words">{item.data}</span>
          </p>

          {item && (
            <p className={`${item.completed ? "line-through text-gray-500" : ""}`}>
              <span className="font-semibold">Assignee:</span> <span className="text-sm break-words">{item.assignee == "" ? "self" : item.assignee}</span>
            </p>
          )}

          {item.dueDate && (
            <p className={`${item.completed ? "line-through text-gray-500" : ""}`}>
              <span className="font-semibold">Due:</span> <span className="text-sm">{item.dueDate}</span>
            </p>
          )}
          {item.priority && (
            <div className={`flex justify-center items-center ${item.completed ? "line-through text-gray-500" : ""}`}>
              <span className="font-semibold">Priority:</span>
              <span><select name="priority" id="priority"
                className='select rounded-2xl w-full ml-3 focus:outline-none border-transparent'
                value={item.priority || "low"}
                onChange={(e) => {
                  dispatch(modTodo({
                    ...item,
                    priority: e.target.value,
                    id: i
                  }))
                }}

              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
              </span>
            </div>
          )}
        </div>

        <button
          className="text-red-500 hover:text-red-700 text-xl w-8 h-8 font-bold self-start"
          onClick={() => dispatch(deletetodo(i))}
          aria-label="Delete"
        >
          X
        </button>
      </div>


    );
  };

  return (
    <>
      <div className="bg-gradient-to-b from-white to-blue-300 smooth-entry flex justify-center items-center flex-col h-[80vh] mt-10">
        <div className="flex flex-row justify-center items-center">
          <input
            type="text"
            value={item.data}
            onClick={() => settaskModal(true)}
            onChange={displaychange}
            onKeyDown={onEnterPress}
            placeholder="enter your task"
            className="p-4 border min-w-[80%] h-14 rounded-xl m-4 focus:outline-none shadow-[0px_5px_5px_rgba(13,69,77,0.5)]"
          ></input>
          {taskModal && <AddTaskModal
            item={item}
            setItem={setItem}
            onClose={() => settaskModal(false)}
            onConfirm={() => {
              settaskModal(false);
              addtodo()
            }} />}
          <button className="text-center m-2 px-5" onClick={addtodo}>
            Add
          </button>
          <button className="text-center m-2 px-5" onClick={() => dispatch(deleteall())}>
            Reset
          </button>
        </div>
        <div className="flex flex-row justify-center items-center">
          <p className="mx-5 font-medium">Completed tasks - {todo.filter((i) => i.completed == true).length} </p>
          <p className="mx-5 font-medium">Uncompleted tasks - {todo.length && todo.length - todo.filter((i) => i.completed == true).length} </p>
          <p className="mx-5 font-medium">Total tasks - {todo.length && todo.length}</p>
        </div>
        <div className="todo-display overflow-scroll overflow-x-hidden border border-gray-400 text-center mb-20">
          {todo.map((item, i) => {
            return <Todo key={i} item={item} i={i} />
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;
