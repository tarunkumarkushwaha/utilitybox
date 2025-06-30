import React, { useEffect, useRef, useState } from 'react'
import functionarray from '../../assets/scripts/script1';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import speaker from '../.././assets/images/speaker.png'

const bargraphGenerator = (array, maxValue) => {
  const numArray = array.split(',').map(item => {
    if (isNaN(item.trim())) throw new Error(`Invalid number: "${item}"`);
    return parseInt(item);
  });

  if (!maxValue || isNaN(maxValue)) throw new Error("Invalid max value");
  return <div className="flex justify-center items-center">
    {numArray.map((value, i) => {
      return <div key={i} className="relative w-20 bg-gray-200 h-64 p-4  flex items-end">
        <div className="bg-sky-600 w-full rounded-md" style={{ height: `${(value / maxValue) * 100}%` }}></div>
        <span className="mt-2 text-sm border-b-2 border-blue-800">{value}</span>
      </div>
    })}
  </div>
};

const shortCountdownTimer = (inputStr) => {
  const parts = inputStr.split(":");
  if (parts.length !== 3) {
    alert("Time must be in HH:MM:SS format");
    return;
  }

  const [h, m, s] = parts.map((n) => parseInt(n.trim()));
  if ([h, m, s].some(isNaN)) {
    alert("Invalid numbers");
    return;
  }

  chrome.runtime.sendMessage({
    type: "SET_SHORT_TIMER",
    data: {
      hours: h,
      minutes: m,
      seconds: s
    }
  }, (response) => {
    if (response?.status) {
      alert("timer started");
    }
  });
};



const hexcolgen = () => {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 16).toString(16);
  }
  return color;
};


const pieChartGenerator = (input) => {
  const data = input.split(',').map(entry => {
    const [label, val] = entry.split(':');
    if (!label || val === undefined || isNaN(val.trim())) {
      throw new Error(`Invalid entry or wrong format: "${entry}"`);
    }
    return {
      label: label.trim(),
      value: parseInt(val.trim()),
      color: hexcolgen()
    };
  });
  if (data.length === 0) throw new Error("No valid input provided.");

  const total = data.reduce((sum, item) => sum + item.value, 0);

  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="flex flex-col items-center gap-4 my-6">
      <svg width="200" height="200" viewBox="-1 -1 2 2" className="transform -rotate-90">
        {data.map((item, i) => {
          const percent = item.value / total;
          const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
          cumulativePercent += percent;
          const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
          const largeArcFlag = percent > 0.5 ? 1 : 0;

          const pathData = `
            M ${startX} ${startY}
            A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}
            L 0 0
          `;

          return (
            <path
              key={i}
              d={pathData}
              fill={item.color}
              stroke="white"
              strokeWidth="0.01"
            />
          );
        })}
      </svg>

      <div className="flex flex-wrap justify-center gap-4">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm">
              {item.label}: {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const jsonMinifier = (input) => {
  try {
    const parsed = JSON.parse(input);
    return (
      <pre className="text-left text-sm bg-gray-100 p-3 rounded max-w-[90vw] overflow-auto whitespace-pre-wrap">
        {JSON.stringify(parsed)}
      </pre>
    );
  } catch (err) {
    return <div className="text-red-600 font-semibold"> Invalid JSON input.</div>;
  }
};


const jsonFormatter = (input) => {
  try {
    const parsed = JSON.parse(input);
    return (
      <pre className="text-left text-sm bg-gray-100 p-3 rounded max-w-[90vw] overflow-auto whitespace-pre-wrap">
        {JSON.stringify(parsed, null, 2)}
      </pre>
    );
  } catch (err) {
    return <div className="text-red-600 font-semibold">Invalid JSON input.</div>;
  }
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
          Result && Result.message ? <div className='flex flex-col justify-center items-center overflow-y-scroll'>
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
  const outputRef = useRef(null);

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
  const pieChartobj = {
    name: "Pie chart Generator",
    inputs: ["string"],
    function: pieChartGenerator,
    description: "Give inputs as this format - john:45, joe:45, tiff:90"
  }

  const dictionaryobj = {
    name: "Dictionary",
    inputs: ["string"],
    function: searchWord,
    description: "Search words"
  }

  const shortCountdownObj = {
    name: "Countdown Timer",
    inputs: ["string"],
    function: shortCountdownTimer,
    description: "Start countdown timer (e.g. 00:30:00 for 30 minutes)"
  };

  const jsonFormatterObj = {
    name: "JSON Formatter",
    inputs: ["string"],
    function: jsonFormatter,
    description: "Paste a raw JSON string and get pretty formatted output."
  };

  const jsonMinifierObj = {
    name: "JSON Minifier",
    inputs: ["string"],
    function: jsonMinifier,
    description: "Compresses JSON into a single line (no spacing)."
  };



  const filteredOptions = [jsonFormatterObj, bargraphobj, dictionaryobj, jsonMinifierObj, pieChartobj, shortCountdownObj, ...functionarray.filter(option =>
    option.name.toLowerCase().includes(inputValue.toLowerCase())
  )]

  let options = inputValue.toLowerCase().length > 0 ? filteredOptions : [jsonFormatterObj, jsonMinifierObj, bargraphobj, dictionaryobj, pieChartobj, shortCountdownObj, ...functionarray]

  const handleOptionClick = (options) => {
    setactiveFunction(options)
    setInputValue(options.name);
    setShowDropdown(false);
  };

  const functionHandler = async () => {
    let result = "";
    try {
      const isStringInput = activeFunction.inputs[0] === "string";
      const isNumberInput = activeFunction.inputs[0] === "number";
      const isNumArray = activeFunction.inputs[0] === "num array";
      const isTwoInputs = activeFunction.inputs.length === 2;

      if (isStringInput) {
        result = await activeFunction.function(functionInput1);
      } else if (isNumberInput) {
        result = await activeFunction.function(parseInt(functionInput1));
      } else if (isNumArray) {
        const arr = functionInput1.split(',').map((item) => {
          if (isNaN(item.trim())) throw new Error(`Invalid number: "${item}"`);
          return parseInt(item);
        });
        result = await activeFunction.function(arr);
      } else if (isTwoInputs) {
        result = await activeFunction.function(functionInput1, functionInput2);
      } else {
        result = "function under construction";
      }

      if (typeof result === "boolean") result = result ? "yes" : "no";
      setoutput(result);

    } catch (err) {
      setoutput(<div className="text-red-600 font-semibold">Error: {err.message}</div>);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-300 w-full smooth-entry">
      <div className="relative p-5 flex justify-center items-center" ref={inputRef}>
        <div className="flex w-80 border border-gray-300 rounded-md shadow-[0px_5px_5px_rgba(13,69,77,0.5)]">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            // defaultValue={functionarray[0].name}
            placeholder={"search tools or select by button"}
            className="w-full px-4 py-2 focus:outline-none rounded-md focus:border-none"
          />
          <div
            className={`px-4 py-2 ${showDropdown ? "rotate-180" : ""} transition-all focus:outline-none hover:border-none cursor-pointer`}
            onClick={handleToggleDropdown}
            title='yes, i am that toggle button'
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
        <div className='flex justify-center gap-2 items-center'>
          <button onClick={functionHandler} className='bg-white'>Output</button>
          {output && <button
            onClick={() => {
              setfunctionInput1("");
              setfunctionInput2("");
              setoutput("");
            }}
            className="bg-white"
          >
            Clear
          </button>}
        </div>

        <div className="flex flex-col items-center relative">
          <div ref={outputRef} className="p-2 rounded">
            {output}
          </div>
          {output && <button
            title='copy'
            className="p-1 h-8 w-8 bg-slate-400 absolute right-5 -bottom-8 text-white rounded hover:bg-slate-600"
            onClick={() => {
              if (outputRef.current) {
                const range = document.createRange();
                range.selectNodeContents(outputRef.current);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                document.execCommand("copy");
                sel.removeAllRanges();
                alert("Copied to clipboard!");
              }
            }}
          >
            <ContentCopyIcon />
          </button>}
        </div>

      </div>

    </div>
  );
};

export default Tools