const bargraphGenerator = (array, maxValue) => {
  const colors = [
    { from: 'from-sky-500', to: 'to-sky-300', text: 'text-sky-700', border: 'border-sky-200' },
    { from: 'from-emerald-500', to: 'to-emerald-300', text: 'text-emerald-700', border: 'border-emerald-200' },
    { from: 'from-violet-500', to: 'to-violet-300', text: 'text-violet-700', border: 'border-violet-200' },
    { from: 'from-amber-500', to: 'to-amber-300', text: 'text-amber-700', border: 'border-amber-200' },
    { from: 'from-rose-500', to: 'to-rose-300', text: 'text-rose-700', border: 'border-rose-200' },
    { from: 'from-indigo-500', to: 'to-indigo-300', text: 'text-indigo-700', border: 'border-indigo-200' },
  ];

  const numArray = array.split(',').map(item => {
    const trimmed = item.trim();
    if (trimmed === "" || isNaN(trimmed)) throw new Error(`Invalid number: "${item}"`);
    return parseInt(trimmed);
  });

  if (!maxValue || isNaN(maxValue)) throw new Error("Invalid max value");

  return (
    <div className="flex justify-center items-end gap-4 p-8 bg-white rounded-xl shadow-xl border border-slate-100">
      {numArray.map((value, i) => {
        const percentage = Math.min((value / maxValue) * 100, 100);
        const color = colors[i % colors.length];

        return (
          <div key={i} className="group relative w-20 h-64 flex flex-col items-center justify-end">

            <div className={`absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-lg`}>
              {value}
            </div>
            <div
              className={`w-full bg-gradient-to-t ${color.from} ${color.to} rounded-t-lg shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-x-105 group-hover:shadow-xl`}
              style={{ height: `${percentage}%` }}
            >
              <div className="w-full h-full bg-white/20 rounded-t-lg opacity-40"></div>
            </div>
            <div className={`mt-4 w-full text-center pt-2 border-t-2 ${color.border}`}>
              <span className={`text-sm font-bold ${color.text}`}>
                {value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const pieChartGenerator = (input) => {
  const data = input.split(',').map(entry => {
    const [label, val] = entry.split(':');
    if (!label || val === undefined || isNaN(val.trim())) {
      throw new Error(`Invalid entry: "${entry}"`);
    }
    return {
      label: label.trim(),
      value: parseInt(val.trim()),
    };
  });

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = ['#0ea5e9', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#6366f1'];

  let cumulativeOffset = 0;

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md mx-auto">
      <div className="relative group">

        <svg width="240" height="240" viewBox="0 0 42 42" className="transform -rotate-90 drop-shadow-xl">
          {data.map((item, i) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${percentage} ${100 - percentage}`;
            const strokeDashoffset = 100 - cumulativeOffset;
            cumulativeOffset += percentage;
            const currentColor = colors[i % colors.length];

            return (
              <circle
                key={i}
                cx="21" cy="21" r="15.915"
                fill="transparent"
                stroke={currentColor}
                strokeWidth="5"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500 ease-in-out cursor-pointer hover:stroke-[6]"
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-black text-slate-800 tracking-tighter">{total}</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 w-full">
        {data.map((item, i) => {
          const currentColor = colors[i % colors.length];
          const percentLabel = ((item.value / total) * 100).toFixed(0);

          return (
            <div key={i} className="flex items-center p-2 rounded-xl bg-slate-50 border border-slate-100 transition-hover hover:bg-white hover:shadow-sm">
              <div
                className="w-3 h-3 rounded-full mr-3 shadow-sm"
                style={{ backgroundColor: currentColor }}
              ></div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-500 truncate w-24">
                  {item.label}
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {item.value} <span className="text-[10px] text-slate-400">({percentLabel}%)</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const jsonMinifier = (input) => {
  try {
    const parsed = JSON.parse(input);
    const minified = JSON.stringify(parsed);

    return (
      <div className="group relative my-6 max-w-[90vw] overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-2xl">

        <div className="relative p-4">
          <pre className="text-left text-sm font-mono text-sky-400 overflow-auto whitespace-pre-wrap break-all selection:bg-sky-500/30">
            {minified}
          </pre>
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="flex items-center gap-3 my-4 p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700">
        <div className="flex flex-col">
          <span className="font-bold text-sm">Invalid JSON</span>
          <span className="text-xs opacity-80">Please check your syntax and try again.</span>
        </div>
      </div>
    );
  }
};

const jsonFormatter = (input) => {
  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, 2);
    const lines = formatted.split('\n');

    return (
      <div className="my-8 max-w-[95vw] rounded-2xl overflow-hidden border border-slate-200 bg-[#282c34] shadow-2xl transition-all duration-300">
        <div className="flex p-4 overflow-auto max-h-[500px] custom-scrollbar">
          <div className="flex flex-col text-right pr-4 border-r border-slate-700 select-none">
            {lines.map((_, i) => (
              <span key={i} className="text-[11px] font-mono text-slate-600 leading-6">
                {i + 1}
              </span>
            ))}
          </div>
          <pre className="pl-4 text-sm font-mono text-[#abb2bf] leading-6 whitespace-pre">
            {lines.map((line, i) => {
              const highlightedLine = line.replace(
                /"([^"]+)":/g,
                '<span class="text-[#e06c75]">"$1"</span>:'
              );

              return (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{ __html: highlightedLine }}
                  className="hover:bg-white/5 px-1 rounded transition-colors"
                />
              );
            })}
          </pre>
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="my-6 p-4 rounded-xl bg-orange-50 border-l-4 border-orange-500 flex items-start gap-3 shadow-sm">
        <div>
          <h4 className="text-sm font-bold text-orange-800 uppercase tracking-wide">Parsing Error</h4>
          <p className="text-xs text-orange-700 mt-1 leading-relaxed">
            The provided input is not valid JSON. Check for trailing commas or missing quotes.
          </p>
        </div>
      </div>
    );
  }
};



const searchWord = async (input) => {
  if (!input.trim()) {
    return <div className="text-amber-600 bg-amber-50 p-4 rounded-lg border border-amber-200 text-center">Please enter a word to search.</div>;
  }

  try {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    const response = await fetch(url + input);
    const result = await response.json();
    if (result.title) {
      return (
        <div className="flex flex-col items-center p-10 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md mx-auto text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-slate-800">{result.title}</h2>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">{result.message}</p>
        </div>
      );
    }

    const data = result[0];
    const word = data.word.charAt(0).toUpperCase() + data.word.slice(1);
    const phonetics = data.phonetic || data.phonetics[0]?.text || "";
    const synonyms = data.meanings[0].synonyms.slice(0, 5);

    return (
      <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 transition-all hover:shadow-sky-100">
        <div className="bg-gradient-to-br from-sky-600 to-indigo-700 p-8 text-white">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tight">{word}</h1>
              <p className="text-sky-100 font-mono mt-1 opacity-80">{phonetics}</p>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
              {data.meanings[0].partOfSpeech}
            </div>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div className="relative pl-6 border-l-4 border-sky-500">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Definition</h3>
            <p className="text-slate-700 leading-relaxed font-medium text-lg">
              {data.meanings[0].definitions[0].definition}
            </p>
          </div>

          {synonyms.length > 0 && (
            <div className="bg-slate-50 p-4 rounded-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Synonyms</h3>
              <div className="flex flex-wrap gap-2">
                {synonyms.map((s, i) => (
                  <span key={i} className="bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-bold text-sky-700 shadow-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.meanings[0].definitions[0].example && (
            <div className="italic text-slate-500 text-sm border-t border-slate-100 pt-4">
              " {data.meanings[0].definitions[0].example} "
            </div>
          )}
        </div>

        {/* <div className="bg-slate-50 px-8 py-3 flex justify-between items-center border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase italic">English Dictionary API</span>
          <button className="text-sky-600 hover:text-sky-700 text-xs font-bold uppercase tracking-tighter">Read More →</button>
        </div> */}
      </div>
    );
  } catch (error) {
    return <div className="text-rose-600 font-bold p-4 bg-rose-50 rounded-lg">Failed to fetch data. Please try again later.</div>;
  }
};

const agecalculator = (bday) => {
  if (!bday || typeof bday !== "string" || !bday.includes("-")) {
    throw new Error("Please provide date in format dd-mm-yyyy");
  }

  const [day, month, year] = bday.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  if (isNaN(birthDate.getTime())) {
    throw new Error("Invalid date format");
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const stats = [
    { label: 'Years', value: years, color: 'from-blue-500 to-indigo-600' },
    { label: 'Months', value: months, color: 'from-purple-500 to-pink-600' },
    { label: 'Days', value: days, color: 'from-emerald-400 to-cyan-500' }
  ];

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100">
      <div className="text-center mb-8">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Your Age</h3>
        <div className="h-1 w-12 bg-indigo-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-full aspect-square flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg shadow-indigo-200/50 transform transition-transform hover:scale-105`}>
              <span className="text-2xl font-black text-white">{stat.value}</span>
            </div>
            <span className="mt-3 text-[10px] font-bold uppercase text-slate-500 tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500 font-medium">Born on:</span>
          <span className="text-slate-800 font-bold">{bday.replace(/-/g, ' / ')}</span>
        </div>
      </div>
    </div>
  );
};

const DaysBetweenDates = (day1, day2) => {
  if (!day1 || !day2 || !day1.includes("-") || !day2.includes("-")) {
    throw new Error("Both dates must be in dd-mm-yyyy format");
  }

  const parseDate = (d) => new Date(d.split("-").reverse().join("-"));
  const start = parseDate(day1);
  const end = parseDate(day2);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date(s)");
  }

  const timeDiff = end - start;
  const totalDays = Math.abs(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  return (
    <div className="max-w-md mx-auto my-8 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
      <div className="bg-slate-900 p-6 text-white relative">
        <div className="flex justify-between items-center relative z-10">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Start</p>
            <p className="font-mono font-bold text-sm">{day1.replace(/-/g, '.')}</p>
          </div>
          <div className="flex-1 mx-4 h-[2px] bg-slate-700 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-500 p-1.5 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.5)]">
              <span className="text-xs">-</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">End</p>
            <p className="font-mono font-bold text-sm">{day2.replace(/-/g, '.')}</p>
          </div>
        </div>
      </div>
      <div className="p-8 flex flex-col items-center">
        <div className="relative">
          <h2 className="text-7xl font-black text-slate-800 tracking-tighter">
            {totalDays}
          </h2>
          <span className="absolute -right-12 bottom-2 text-slate-400 font-bold uppercase text-xs rotate-90">
            Days
          </span>
        </div>

        <div className="mt-6 flex gap-3">
          <div className="bg-sky-50 text-sky-700 px-4 py-2 rounded-xl text-sm font-bold border border-sky-100">
            {weeks} Weeks
          </div>
          <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-bold border border-indigo-100">
            {remainingDays} Days
          </div>
        </div>
        <p className="mt-8 text-slate-500 text-sm font-medium">
          {timeDiff < 0 ? (
            <span className="text-rose-500 flex items-center gap-1">
              <span>-</span> The end date is in the past
            </span>
          ) : (
            <span className="text-emerald-500 flex items-center gap-1">
              <span>-</span> Total duration of your timeline
            </span>
          )}
        </p>
      </div>
      <div className="h-1.5 w-full bg-slate-100 flex">
        <div className="h-full bg-sky-500 w-1/3 opacity-50"></div>
        <div className="h-full bg-indigo-500 w-1/3 opacity-50"></div>
        <div className="h-full bg-violet-500 w-1/3 opacity-50"></div>
      </div>
    </div>
  );
};
const HexColGen = () => {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 16).toString(16);
  }
  const hexValue = color.toUpperCase();

  return (
    <div className="mx-auto w-64 bg-white p-4 rounded-[2rem] shadow-xl border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">

      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col">
          <p className="text-xl font-mono font-bold text-slate-800 tracking-tight">{hexValue}</p>
        </div>
        <div
          className="w-20 h-20 rounded-xl border-4 border-white shadow-sm ring-1 ring-slate-100"
          style={{ backgroundColor: hexValue }}
        />
      </div>
    </div>
  );
};

const toolsarray = [
  {
    name: "JSON Formatter",
    inputs: ["string"],
    function: jsonFormatter,
    description: "Paste a raw JSON string and get pretty formatted output."
  },
  {
    name: "JSON Minifier",
    inputs: ["string"],
    function: jsonMinifier,
    description: "Compresses JSON into a single line (no spacing)."
  },
  {
    name: "bargraph Generator",
    inputs: ["array of data", "max value"],
    function: bargraphGenerator,
    description: "Generates bargraph given maxvalue and data seperated by , "
  },
  {
    name: "Pie chart Generator",
    inputs: ["string"],
    function: pieChartGenerator,
    description: "Give inputs as this format - john:45, joe:45, tiff:90"
  },
  {
    name: "Dictionary",
    inputs: ["string"],
    function: searchWord,
    description: "Search words"
  },
  {
    name: "Days Between Dates",
    inputs: ["start date", "end date"],
    function: DaysBetweenDates,
    description: "Finds days past between given dates in format DD-MM-YYYY"
  },
  {
    name: "Age calculator",
    inputs: ["string"],
    function: agecalculator,
    description: "Finds age given birth date in format DD-MM-YYYY"
  },
  // {
  //   name: "",
  //   inputs: [""],
  //   function: ,
  //   description: ""
  // },
  {
    name: "Random color generator",
    inputs: [""],
    function: HexColGen,
    description: "Generates a random hex color code."
  },
];
export default toolsarray