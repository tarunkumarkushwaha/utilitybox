import { useEffect, useRef, useState } from 'react'
import toolsarray from './ToolBox/Tools';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InputField from './InputField';

const ToolsPage = () => {
  const [activeToolName, setactiveToolName] = useState(toolsarray[0].name || "");
  const [output, setoutput] = useState('');
  const [functionInput, setfunctionInput] = useState({ input1: "" });
  const [activeFunction, setactiveFunction] = useState(toolsarray[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

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
    setactiveToolName(e.target.value)
    setShowDropdown(true)
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setactiveToolName("")
    setoutput("")
  };

  const options = activeToolName.trim()
    ? toolsarray.filter(opt =>
      opt.name.toLowerCase().includes(activeToolName.toLowerCase())
    )
    : toolsarray;

  const handleOptionClick = (option) => {
    setactiveFunction(option);
    setactiveToolName(option.name);
    setShowDropdown(false);
  };

  const formatResult = (result) =>
    typeof result === "boolean" ? (result ? "yes" : "no") : result;



  const functionHandler = async () => {
    try {
      const inputsDef = activeFunction.inputs || [];

      if (
        inputsDef.length === 0 ||
        (inputsDef.length === 1 && inputsDef[0].trim() === "")
      ) {
        const result = await activeFunction.function();
        return setoutput(formatResult(result));
      }

      const args = inputsDef.map((type, index) => {
        const value = functionInput[`input${index + 1}`];

        switch (type) {
          case "number": {
            const num = Number(value);
            if (isNaN(num)) throw new Error(`Invalid number: "${value}"`);
            return num;
          }

          case "num array":
            return value.split(",").map(item => {
              const num = Number(item.trim());
              if (isNaN(num)) throw new Error(`Invalid number: "${item}"`);
              return num;
            });

          default:
            return value;
        }
      });

      const result = await activeFunction.function(...args);
      setoutput(formatResult(result));

    } catch (err) {
      setoutput(
        <div className="text-red-600 text-center font-semibold">
          Error: {err.message}
        </div>
      );
    }
  };


  const shouldShowInputs = !(
    activeFunction.inputs.length === 1 &&
    activeFunction.inputs[0].trim() === ""
  );


  // console.log(functionInput.input1);


  return (
    <div className="bg-gradient-to-b from-white to-blue-300 w-full smooth-entry">
      <div className="relative p-5 flex justify-center items-center" ref={inputRef}>
        <div className="flex w-80 border border-gray-300 rounded-md shadow-[0px_5px_5px_rgba(13,69,77,0.5)]">
          <input
            type="text"
            value={activeToolName}
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
          <div className="absolute top-16 w-80 max-h-48 overflow-scroll overflow-x-hidden z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg">
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
          {shouldShowInputs &&
            activeFunction.inputs.map((item, index) => (
              <InputField
                key={index}
                value={functionInput[`input${index + 1}`] || ""}
                placeholder={item}
                label={item}
                onChange={(value) =>
                  setfunctionInput(prev => ({
                    ...prev,
                    [`input${index + 1}`]: value
                  }))
                }
              />
            ))}

        </div>
        <div className="px-4 py-2">
          {activeFunction.description}
        </div>
        <div className='flex justify-center gap-2 items-center'>
          <button onClick={functionHandler} className='bg-white'>Output</button>
          <button
            onClick={() => {
              setfunctionInput({ input1: "" });
              setoutput("")
            }}
            className="bg-white"
          >
            Clear
          </button>
        </div>

        <div className="flex flex-col items-center relative">
          {output && <button
            title='copy'
            className="p-1 h-8 w-8 bg-orange-400 absolute right-5 -top-10 text-white rounded hover:bg-orange-600"
            onClick={() => {
              if (outputRef.current) {
                const range = document.createRange();
                range.selectNodeContents(outputRef.current);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                document.execCommand("copy");
                sel.removeAllRanges();
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }
            }}
          >
            <ContentCopyIcon />
          </button>}
          {copied && (
            <div className="flex flex-col right-0 text-[#5ecf12] font-semibold items-center absolute">
              Copied to clipboard!
            </div>
          )}

          <div ref={outputRef} className="p-2 overflow-y-auto w-[550px] rounded">
            {output}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ToolsPage