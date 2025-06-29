import React, { useEffect, useRef, useState } from 'react'
import functionarray from '../../assets/scripts/script1';
// import speaker from '../.././assets/images/speaker.png'

const bargraphGenerator = (array, maxValue) => {
  const numarray = array.split(',').map(item => parseInt(item))
  return <div className="flex justify-center items-center">
    {numarray.map((value, i) => {
      return <div key={i} className="relative w-20 bg-gray-200 h-64 p-4  flex items-end">
        <div className="bg-sky-600 w-full rounded-md" style={{ height: `${(value / maxValue) * 100}%` }}></div>
        <span className="mt-2 text-sm border-b-2 border-blue-800">{value}</span>
      </div>
    })}
  </div>
};

const searchWord = async (input) => {
  if (input.length) {
    let Result
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
    let qwery = url + input
    const response = await fetch(qwery);
    Result = await response.json();
    // console.log(Result)

    return (
      <div className={` ${Result ? "flex" : "hidden"} flex-col justify-center items-center`}>

        {
          Result && Result.message ? <div className='flex flex-col justify-center items-center overflow-scroll'>
            <h1>{Result.title}</h1>
            <div>{Result.message}</div>
            <div>{Result.resolution}</div>
          </div> : Result ? <>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center">
                <h1 className='text-2xl text-blue-900 font-bold'>{Result && Result[0].word.split(" ").map((n) => n.slice(0, 1).toUpperCase().concat(n.slice(1).toLowerCase()))}</h1>
              </div>
              <h4><b className='textdict'>Synonym - </b>
                {Result && Result[0].meanings[0].synonyms.toString().split(",").map((e) => { return e.concat(" ") })}
              </h4>
            </div>
            <div className='flex flex-col justify-center items-center meaningbox'>
              <div><b className='textdict'>Meaning - </b>
                {Result && Result[0].meanings[0].definitions.length > 2 ? Result && Result[0].meanings[0].definitions[0].definition + "," +
                  Result[0].meanings[0].definitions[1].definition : Result && Result[0].meanings[0].definitions[0].definition}
              </div>
              <div><b className='textdict'>Verb - </b>
                {Result && Result[0].meanings[0].definitions[0].definition}
              </div>
            </div>
          </> : <><h1>Output -</h1></>
        }
      </div>
    )
  }
  else {
    alert("enter any text")
  }
}

const Tools = () => {
  const [inputValue, setInputValue] = useState("");
  const [output, setoutput] = useState('');
  const [functionInput1, setfunctionInput1] = useState("");
  const [functionInput2, setfunctionInput2] = useState("");
  const [activeFunction, setactiveFunction] = useState(functionarray[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    setShowDropdown(true)
  };

  const handleFunctionInputChange1 = (e) => {
    setfunctionInput1(e.target.value)
  };

  const handleFunctionInputChange2 = (e) => {
    setfunctionInput2(e.target.value)
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setInputValue("")
    setoutput("")
  };

  const bargraphobj = {
    name: "bargraph Generator",
    inputs: ["array of data", "max value"],
    function: bargraphGenerator,
    description: "Generates bargraph given maxvalue and data seperated by , "
  }

  const dictionaryobj = {
    name: "Dictionary",
    inputs: ["string"],
    function: searchWord,
    description: "Search words"
  }

  const filteredOptions = [bargraphobj, dictionaryobj, ...functionarray.filter(option =>
    option.name.toLowerCase().includes(inputValue.toLowerCase())
  )]

  let options = inputValue.toLowerCase().length > 0 ? filteredOptions : [bargraphobj, dictionaryobj, ...functionarray]

  const handleOptionClick = (options) => {
    setactiveFunction(options)
    setInputValue(options.name);
    setShowDropdown(false);
  };

  const functionHandler = async () => {
    let result = ""
    if (activeFunction.inputs[0] == "string") {
      result = await activeFunction.function(functionInput1)
      if (typeof result == "boolean" && result == true) {
        result = "yes"
      } else if (typeof result == "boolean" && result == false) { result = "no" }
    }
    else if (activeFunction.inputs[0] == "number") {
      result = await activeFunction.function(parseInt(functionInput1))
      if (typeof result == "boolean" && result == true) {
        result = "yes"
      } else if (typeof result == "boolean" && result == false) { result = "no" }
    }
    else if (activeFunction.inputs[0] == "num array") {
      result = await activeFunction.function(functionInput1.split(',').map((item => parseInt(item))))
      if (typeof result == "boolean" && result == true) {
        result = "yes"
      } else if (typeof result == "boolean" && result == false) { result = "no" }
    }
    else if (activeFunction.inputs.length == 2) {
      result = await activeFunction.function(functionInput1, functionInput2)
      if (typeof result == "boolean" && result == true) {
        result = "yes"
      } else if (typeof result == "boolean" && result == false) { result = "no" }
    }
    else { result = "function under construction" }
    setoutput(result);
    // setfunctionInput1('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-300 w-full smooth-entry">
      <div className="relative p-5 flex justify-center items-center" ref={inputRef}>
        <div className="flex w-80 border border-gray-300 rounded-md shadow-[0px_5px_5px_rgba(13,69,77,0.5)]">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={functionarray[0].name}
            className="w-full px-4 py-2 focus:outline-none rounded-md focus:border-none"
          />
          <div
            className="px-4 py-2 focus:outline-none hover:border-none cursor-pointer"
            onClick={handleToggleDropdown}
          >
            &#9660;
          </div>
        </div>
        {showDropdown && (
          <div className="absolute top-16 w-80 max-h-80 overflow-scroll overflow-x-hidden z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg">
            {options.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='flex flex-col gap-3 items-center justify-center'>
        <div>
          <input
            type="text"
            value={functionInput1}
            onChange={handleFunctionInputChange1}
            placeholder={activeFunction.inputs[0]}
            className="w-full px-4 py-2 rounded-md border shadow-[0px_5px_5px_rgba(13,69,77,0.5)] border-blue-950 focus:border-blue-400 focus:outline-none"
          />
          {activeFunction.inputs.length == 2 &&
            <input
              type="text"
              value={functionInput2}
              onChange={handleFunctionInputChange2}
              placeholder={activeFunction.inputs[1]}
              className="w-full px-4 py-2 rounded-md border shadow-[0px_5px_5px_rgba(13,69,77,0.5)] border-blue-950 focus:border-blue-400 focus:outline-none"
            />
          }

        </div>
        <div className="px-4 py-2">
          {activeFunction.description}
        </div>
        <button onClick={functionHandler} className='bg-white'>Result</button>
        <div className=' '>{output}</div>
      </div>

    </div>
  );
};

export default Tools