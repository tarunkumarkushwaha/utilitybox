import ModalPortal from '../ModalPortal'

const Replacemodal = ({ prevword, newword, setPrevword, setNewword, closemodal }) => {
  const onchange1 = (e) => {
    setPrevword(e.target.value)
  }
  const onchange2 = (e) => {
    setNewword(e.target.value)
  }
  return (
    <>
        <ModalPortal>
          <div className="fixed inset-0 z-[10000] flex items-center justify-center">

      
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={closemodal}
            />

  
            <div
              className="
          relative z-[10001]
          w-[90%] max-w-md
          bg-white
          rounded-2xl
          shadow-2xl
          p-6
          animate-modal-in
        "
            >
              <h3 className="text-lg font-semibold text-center text-gray-800">
                Replace Word
              </h3>

              <div className="mt-5 space-y-4">
                <input
                  type="text"
                  placeholder="Word to be replaced"
                  value={prevword}
                  onChange={onchange1}
                  className="
              w-full h-11 rounded-xl
              border border-gray-300
              text-center
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
                />

                <input
                  type="text"
                  placeholder="Replace with"
                  value={newword}
                  onChange={onchange2}
                  className="
              w-full h-11 rounded-xl
              border border-gray-300
              text-center
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closemodal}
                  className="
              px-4 h-10 rounded-xl
              border border-gray-300
              text-sm
              hover:bg-gray-100 transition
            "
                >
                  Cancel
                </button>

                <button
                  onClick={closemodal}
                  className="
              px-5 h-10 rounded-xl
              bg-blue-600 text-white text-sm
              hover:bg-blue-700 transition
            "
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
    </>
  )
}
export default Replacemodal