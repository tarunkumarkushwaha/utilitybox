import React from 'react'

const Replacemodal = ({ prevword, newword, setPrevword, setNewword, closemodal }) => {
  const onchange1 = (e) => {
    setPrevword(e.target.value)
  }
  const onchange2 = (e) => {
    setNewword(e.target.value)
  }
  return (
    <>
      {/* no fade effect side click modal close has to be added */}
      <div className='bg-white border border-slate-400 smooth-entry shadow-[0px_5px_5px_rgba(13,69,77,0.5)] rounded-xl left-1/2 -translate-x-1/2 p-4 absolute top-1/3'>
        <input
          type="text"
          className="text-center border shadow-[0px_5px_5px_rgba(13,69,77,0.5)] border-black h-10 rounded-xl m-4 focus:outline-none"
          placeholder="Word to be replaced"
          value={prevword}
          onChange={onchange1}
        ></input>
        <input
          type="text"
          className="text-center border shadow-[0px_5px_5px_rgba(13,69,77,0.5)] border-black h-10 rounded-xl m-4 focus:outline-none"
          placeholder="Replace with"
          value={newword}
          onChange={onchange2}
        ></input>
        <button onClick={closemodal}>Ok</button>
      </div>
    </>
  )
}
export default Replacemodal