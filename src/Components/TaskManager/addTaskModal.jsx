import React, { useEffect, useState } from 'react';
import ModalPortal from '../ModalPortal';
import { deleteall } from "../../features/todos/todoSlice";
import { deletetodo } from '../../features/todos/todoSlice';
import { modTodo } from "../../features/todos/todoSlice";
import { useDispatch } from 'react-redux'

const Todo = ({ item, i }) => {
  const dispatch = useDispatch()
  return (
    <div
      className={`
    relative flex flex-col sm:flex-row gap-4
    p-4 rounded-xl border shadow-sm bg-white
    w-full
    ${item.priority === "low"
          ? "border-l-4 border-green-400"
          : item.priority === "medium"
            ? "border-l-4 border-orange-400"
            : "border-l-4 border-red-400"
        }
  `}
    >
      <div className="flex flex-col gap-2 flex-1 min-w-0">

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 accent-blue-500"
            checked={item.completed}
            onChange={(e) =>
              dispatch(
                modTodo({
                  ...item,
                  check: e.target.checked,
                  id: i,
                })
              )
            }
          />

          <h3
            className={`font-semibold text-base break-words ${item.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
          >
            {i + 1}. {item.title}
          </h3>
        </div>

        {item.data && (
          <p
            className={`text-sm break-words ${item.completed ? "line-through text-gray-400" : "text-gray-600"
              }`}
          >
            <span className="font-medium text-gray-700">Details:</span>{" "}
            {item.data}
          </p>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span className={item.completed ? "line-through" : ""}>
            <b>Assignee:</b> {item.assignee || "self"}
          </span>

          {item.dueDate && (
            <span className={item.completed ? "line-through" : ""}>
              <b>Due:</b> {item.dueDate}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-gray-700">Priority:</span>
          <select
            className="px-3 py-1 rounded-full border text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={item.priority || "low"}
            onChange={(e) =>
              dispatch(
                modTodo({
                  ...item,
                  priority: e.target.value,
                  id: i,
                })
              )
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <button
        onClick={() => dispatch(deletetodo(i))}
        className="
      absolute top-3 right-3 w-8
      text-gray-400 hover:text-red-500
      transition
    "
        aria-label="Delete"
      >
        X
      </button>
    </div>
  );
};

const AddTaskModal = ({ item, setItem, onConfirm, onClose, selectedDate, todo }) => {
  const [AddTask, setAddTask] = useState(false)
  const dispatch = useDispatch()
  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      onConfirm();
    }
  }
  useEffect(() => {
    setItem({ ...item, dueDate: selectedDate });
  }, [])

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center">
 
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />


        <div
          onClick={(e) => e.stopPropagation()}
          className="
        relative z-[10001]
        w-[95%] max-w-md
        max-h-[85vh]
        bg-white rounded-2xl shadow-2xl
        flex flex-col
        animate-modal-in
      "
        >

          <div className="p-4 border-b flex flex-col justify-center items-center gap-2">
            <button
              className="text-sm text-red-500 hover:text-red-600"
              onClick={() => dispatch(deleteall())}
            >
              Reset
            </button>

            <button
              className="text-sm bg-blue-100 w-36 py-2 rounded-xl"
              onClick={() => setAddTask(!AddTask)}
            >
              Add New Task
            </button>
          </div>

          {(AddTask || todo.filter(t => t.dueDate === selectedDate).length === 0) && (
            <div className="p-4 border-b space-y-3">
              <input
                className="w-full h-10 rounded-xl px-3 border focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Task title"
                value={item.title}
                onChange={(e) => setItem({ ...item, title: e.target.value })}
              />

              <input
                className="w-full h-10 rounded-xl px-3 border"
                placeholder="Task details"
                value={item.data}
                onChange={(e) => setItem({ ...item, data: e.target.value })}
              />

              <input
                className="w-full h-10 rounded-xl px-3 border"
                placeholder="Assignee"
                value={item.assignee}
                onChange={(e) => setItem({ ...item, assignee: e.target.value })}
              />

              <select
                className="w-full h-10 rounded-xl px-3 border"
                value={item.priority}
                onChange={(e) =>
                  setItem({ ...item, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded-xl bg-gray-200"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-xl bg-blue-500 text-white"
                  onClick={onConfirm}
                >
                  Create
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {todo.filter(t => t.dueDate === selectedDate).length === 0 ? (
              <p className="text-sm text-gray-500 text-center">
                No tasks for this date
              </p>
            ) : (
              todo
                .filter(t => t.dueDate === selectedDate)
                .map((item, i) => (
                  <Todo key={i} item={item} i={i} />
                ))
            )}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default AddTaskModal;

