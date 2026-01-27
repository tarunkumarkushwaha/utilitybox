import ModalPortal from "../ModalPortal";

const AddTabModal = ({ tabTitle, setTabTitle, onConfirm, onClose }) => {
  return (
    <ModalPortal>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center">

 
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />

    
        <div
          className="
          relative z-[10001]
          w-[90%] max-w-sm
          rounded-2xl bg-white
          shadow-2xl p-6
          animate-modal-in
        "
        >
          <h2 className="text-lg font-semibold text-center">
            Add New Tab
          </h2>

          <input
            className="
            mt-4 w-full h-11 rounded-xl
            border border-gray-300 text-center
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
            value={tabTitle}
            onChange={(e) => setTabTitle(e.target.value.slice(0, 6))}
            placeholder="Tab name"
          />

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 h-10 rounded-xl border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="flex-1 h-10 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default AddTabModal;
