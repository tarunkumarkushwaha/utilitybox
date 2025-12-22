import React, { useEffect, useState } from 'react'
import RegexTester from './RegexTester';
const Calculator = () => {
  const [Output, setOutput] = useState("");
  const percentCalculator = (e) => {
    let input = Output.split("/")
    setOutput(eval(input[0] / input[1] * 100).toString())
  }
  const clicked = (e) => {
    setOutput(Output.concat(e.target.value))
  }
  const change = (e) => {
    setOutput(e.target.value)
  }
  const result = () => {
    if (Output.length>1) {
      setOutput(eval(Output).toString())
    }
  }
  const clinicAllClear = () => {
    setOutput("")
  }

  useEffect(() => {
    const onkeyPress = (e) => {
      if (e.key == "Enter") {
        result();
      }
      else if (e.key == "Backspace") {
        setOutput(prev => prev.split('').slice(0, -1).join(''))
      }
      else if (buttonnameArray.some(item => item == e.key)  && e.key !== ' ') {
        setOutput(prev => prev.concat(e.key))
      }
    }
    window.addEventListener('keydown', onkeyPress);

    return () => {
      window.removeEventListener('keydown', onkeyPress);
    };
  }, [Output]);

  const buttonnameArray = [7, 8, 9, 4, 5, 6, 1, 2, 3, "+", 0, ".", "-", "*", "/"]
  return (
    <RegexTester/>
    // <div className='bg-gradient-to-b h-[75vh] from-white to-blue-300'>
    //   <div className="mt-4 h-[69vh] smooth-entry border border-slate-300 rounded-xl flex flex-col justify-center items-center bg-[#dfdfdf] shadow-[0px_5px_5px_rgba(13,69,77,0.5)] mx-auto p-2.5 w-[390px]">
    //     <input type="text" className="bg-white mt-6 pr-2 rounded-xl focus:outline-none text-right text-[50px] font-bold mx-[5px_2px_15px_5px] w-[370px] h-[83px] shadow border-transparent"
    //       onChange={change} value={Output == "" ? 0 : Output} />
    //     <div className='grid grid-cols-3 gap-3 mt-5'>
    //       {buttonnameArray.map((item, i) => (<button key={i} value={item} className="w-28 bg-white font-bold text-2xl border-transparent" onClick={clicked}>{item}</button>))}

    //       <button value={"%"} className="w-28 bg-white font-bold text-2xl border-transparent" onClick={percentCalculator}>%</button>
    //       <button value={"clear"} className="w-28 bg-white font-bold text-2xl border-transparent" onClick={clinicAllClear}>C</button>
    //       <button value={"="} className="w-28 bg-white font-bold text-2xl border-transparent" onClick={result}>=</button>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Calculator