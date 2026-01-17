import React from 'react';

const AddTabModal = ({ tabTitle, setTabTitle, onConfirm, onClose }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50'>
      <div className='bg-white border border-slate-400 shadow-xl rounded-xl p-6 min-w-[300px]'>
        <h2 className="text-xl font-bold mb-4 text-center">Add New Tab</h2>
        <input
          type="text"
          className="w-full text-center border border-black h-10 rounded-xl mb-4 px-2 focus:outline-none"
          placeholder="Enter tab title"
          value={tabTitle}
          onChange={(e) => {
            if (e.target.value.length < 7) { setTabTitle(e.target.value) }
            else { setTabTitle(e.target.value.substring(0, 6)) }
          }}
        />
        <div className="flex justify-center gap-2">
          <button
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTabModal;
