import React, { useEffect, useRef, useState } from 'react'

const CurrencyConverter = () => {
  const [inputValue, setInputValue] = useState("indian");
  const [amount, setamount] = useState(0);
  const [inputValue2, setInputValue2] = useState("nepali");
  const [output, setoutput] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const inputRef = useRef(null);

const currency = [
  { name: "indian", value: 1 },          // INR
  { name: "nepali", value: 1.60 },       // NPR
  { name: "usd", value: 0.01166 },       // US Dollar
  { name: "euro", value: 0.01024 },      // Euro
  { name: "yen", value: 1.689 },         // Japanese Yen
  { name: "pound", value: 0.00862 },     // British Pound
  { name: "cny", value: 0.08382 },       // Chinese Yuan
  { name: "chf", value: 0.00959 },       // Swiss Franc
  { name: "rub", value: 0.914 },         // Russian Ruble
  { name: "zar", value: 0.210 }          // South African Rand
];


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
        setShowDropdown2(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredOptions = currency.filter(option =>
    option.name.toLowerCase().includes(inputValue.toLowerCase())
  )
  const filteredOptions2 = currency.filter(option =>
    option.name.toLowerCase().includes(inputValue2.toLowerCase())
  )

  const handleConvert = () => {
    let value1 = currency.filter((item, i) => { return item.name == inputValue })[0]?.value
    let value2 = currency.filter((item, i) => { return item.name == inputValue2 })[0]?.value

    // console.log(value1, value2)
    setoutput((1 / value1 * value2) * parseInt(amount))
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[70vh] bg-gradient-to-b from-white to-blue-300 smooth-entry">

        <div className="relative bg-white shadow-[0px_5px_5px_rgba(13,69,77,0.5)] rounded-xl border border-slate-400 p-5 flex flex-col gap-4 justify-center items-center" ref={inputRef}>
          <input
            type="text"
            // value={amount}
            onChange={(e) => {
              setamount(e.target.value)
            }}
            placeholder="enter amount"
            className="w-full px-4 py-2 focus:outline-none rounded-md focus:border-none shadow-[0px_5px_5px_rgba(13,69,77,0.5)]"
          />
          <div className=' shadow-[0px_5px_5px_rgba(13,69,77,0.5)]'>
            <div className="flex w-60 border border-gray-300 rounded-md">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setShowDropdown(true)
                }}
                placeholder="currency 1"
                className="w-full px-4 py-2 focus:outline-none rounded-md focus:border-none"
              />
              <div
                className="px-4 py-2 focus:outline-none hover:border-none cursor-pointer bg-white"
                onClick={() => {
                  setShowDropdown(!showDropdown)
                  setInputValue("")
                }}
              >
                &#9660;
              </div>
            </div>
            {showDropdown && (
              <div className="absolute top-16 w-60 max-h-60 overflow-scroll overflow-x-hidden z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg">
                {filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setInputValue(option.name);
                      setShowDropdown(false);
                    }}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className=' shadow-[0px_5px_5px_rgba(13,69,77,0.5)]'>
            <div className="flex w-60 border border-gray-300 rounded-md">
              <input
                type="text"
                value={inputValue2}
                onChange={(e) => {
                  setInputValue2(e.target.value)
                  setShowDropdown2(true)
                }}
                placeholder="currency 2"
                className="w-full px-4 py-2 focus:outline-none rounded-md focus:border-none"
              />
              <div
                className="px-4 py-2 focus:outline-none hover:border-none cursor-pointer bg-white"
                onClick={() => {
                  setShowDropdown2(!showDropdown2)
                  setInputValue2("")
                }}
              >
                &#9660;
              </div>
            </div>
            {showDropdown2 && (
              <div className="absolute top-16 w-60 max-h-60 overflow-scroll overflow-x-hidden z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg">
                {filteredOptions2.map((option, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setInputValue2(option.name);
                      setShowDropdown2(false);
                    }}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className='bg-white' onClick={handleConvert}>convert</button>
          <div className='font-bold text-3xl m-4 h-10'>{output?.toFixed(2)}</div>
          <div className='font-normal text-xs m-1 h-5'>last updated 9 june 2025</div>
        </div>

      </div>
    </>
  )
}

export default CurrencyConverter

