import React from 'react';

const AddTaskModal = ({ item, setItem, onConfirm, onClose }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50'>
      <div className='bg-white border border-slate-400 shadow-xl rounded-xl p-6 min-w-[300px]'>
        <h2 className="text-xl font-bold mb-4 text-center">Add New Task</h2>

        <input
          type="text"
          className="w-full text-center border border-black h-10 rounded-xl mb-4 px-2 focus:outline-none border-transparent select"
          placeholder="Enter task title"
          value={item.title}
          onChange={(e) => {
            setItem({ ...item, title: e.target.value });
          }}
        />

        <input
          type="text"
          className="w-full text-center border border-black h-10 rounded-xl mb-4 px-2 focus:outline-none border-transparent select"
          placeholder="Enter task detail"
          value={item.data}
          onChange={(e) => {
            setItem({ ...item, data: e.target.value });
          }}
        />

        <input
          type="text"
          className="w-full text-center border border-black h-10 rounded-xl mb-4 px-2 focus:outline-none border-transparent select"
          placeholder="Enter task assignee"
          value={item.assignee}
          onChange={(e) => {
            setItem({ ...item, assignee: e.target.value });
          }}
        />
        <input
          type="date"
          className="w-full text-center border border-black h-10 rounded-xl mb-4 px-2 focus:outline-none border-transparent select"
          value={item.dueDate || ""}
          onChange={(e) => {
            setItem({ ...item, dueDate: e.target.value });
          }}
        />
        <select name="priority" id="priority"
          className='select rounded-2xl w-full focus:outline-none border-transparent'
          value={item.priority || "low"}
          // defaultValue={"low"}
          onChange={(e) => {
            setItem({ ...item, priority: e.target.value });
          }}
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;

