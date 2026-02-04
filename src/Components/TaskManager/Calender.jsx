import React, { useState, useRef, useEffect } from 'react'
import AddTaskModal from './addTaskModal';
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, loadTodos } from '../../features/todos/todoSlice';
import AlarmClock from './AlarmClock';

const Calender = () => {
  const [showAddTask, setshowAddTask] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [item, setItem] = useState({
    title: "",
    data: "",
    assignee: "",
    dueDate: '1-1-2026',
    priority: "low",
    completed: false,
  });
  const todo = useSelector((state) => state.TODO)

  // console.log("rendering")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch])

  const addtask = () => {
    dispatch(addTodo(item))
    setItem({
      title: "",
      data: "",
      assignee: "",
      dueDate: selectedDate,
      completed: false,
      priority: "low"
    });
  }

  const today = new Date();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const blanks = Array(firstDay).fill(null);
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const hasTodoOnDate = (dateStr) => {
    return todo.some(t => t.dueDate === dateStr);
  };

  const formatDate = (day) => {
    const d = String(day).padStart(2, "0");
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const y = today.getFullYear();
    return `${d}-${m}-${y}`;
  };
  return (
    <>
      <div
        className="clock-body smooth-entry flex flex-col bg-gradient-to-b from-white to-blue-300 justify-start items-center p-2 bg-cover bg-center"
      >
        <AlarmClock />
        <div className="bg-white bg-opacity-70 text-black rounded-xl p-2 shadow-md w-full max-w-[500px]">
          <div className="w-full">
            {showAddTask && <AddTaskModal
              item={item}
              setItem={setItem}
              todo={todo}
              selectedDate={selectedDate}
              onClose={() => setshowAddTask(false)}
              onConfirm={() => {
                setshowAddTask(false);
                addtask()
              }} />}
            <div className="text-center font-semibold text-lg mb-2">
              {monthNames[today.getMonth()]} {today.getFullYear()}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
              {days.map((day, idx) => (
                <div key={idx} className="text-gray-600">{day}</div>
              ))}

              {[...blanks, ...dates].map((date, i) => {
                if (!date) return <div key={i} />;

                const dateStr = formatDate(date);

                return (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedDate(dateStr);
                      setshowAddTask(true);
                    }}
                    className={`${hasTodoOnDate(dateStr) && "bg-green-200"}
          relative h-8 flex items-center justify-center rounded cursor-pointer
          ${date === today.getDate() ? " border-black border" : "hover:bg-gray-200"}
        `}
                  >
                    {date}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Calender
