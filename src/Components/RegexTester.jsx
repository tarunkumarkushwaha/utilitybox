import { useEffect, useMemo, useState } from "react";

/* ---------- SAFE STORAGE ---------- */
const isChromeExtension = () =>
    typeof chrome !== "undefined" && chrome.storage?.local;

const safeStorageSet = (key, value) => {
    if (isChromeExtension()) {
        chrome.storage.local.set({ [key]: value });
    }
};

const safeStorageGet = async (key) => {
    return new Promise((resolve) => {
        if (isChromeExtension()) {
            chrome.storage.local.get([key], (result) => resolve(result[key]));
        } else {
            resolve(null);
        }
    });
};

const PRESETS = {
    Email: "\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b",
    URL: "https?:\\/\\/(www\\.)?[-\\w@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
    Phone: "\\b\\d{10}\\b",
};

const RegexTester = () => {
    const [text, setText] = useState("");
    const [pattern, setPattern] = useState("");
    const [flags, setFlags] = useState("gi");
    const [highlight, setHighlight] = useState(true);
    const [error, setError] = useState("");
    const [showHelp, setShowHelp] = useState(false);


    useEffect(() => {
        (async () => {
            const saved = await safeStorageGet("regexTester");
            if (saved) {
                setText(saved.text || "");
                setPattern(saved.pattern || "");
                setFlags(saved.flags || "gi");
                setHighlight(saved.highlight ?? true);
            }
        })();
    }, []);

    /* ---------- SAVE STATE ---------- */
    useEffect(() => {
        safeStorageSet("regexTester", {
            text,
            pattern,
            flags,
            highlight,
        });
    }, [text, pattern, flags, highlight]);

    /* ---------- REGEX LOGIC ---------- */
    const { output, matches } = useMemo(() => {
        if (!pattern) return { output: text, matches: [] };

        try {
            setError("");
            const regex = new RegExp(pattern, flags);
            const found = [...text.matchAll(regex)];

            if (!highlight) {
                return { output: text, matches: found };
            }

            let lastIndex = 0;
            const parts = [];

            found.forEach((m, i) => {
                const start = m.index;
                const end = start + m[0].length;

                if (start > lastIndex) {
                    parts.push(text.slice(lastIndex, start));
                }

                parts.push(
                    <mark
                        key={i}
                        className="bg-yellow-300 text-black px-1 rounded"
                    >
                        {m[0]}
                    </mark>
                );

                lastIndex = end;
            });

            parts.push(text.slice(lastIndex));

            return { output: parts, matches: found };
        } catch {
            setError("Invalid regex");
            return { output: text, matches: [] };
        }
    }, [text, pattern, flags, highlight]);

    const copyMatches = () => {
        const data = matches.map((m) => m[0]).join("\n");
        navigator.clipboard.writeText(data);
    };

    return (
        <div className="p-3 w-full text-sm space-y-3 bg-gradient-to-b h-[75vh] from-white to-blue-300 shadow-md text-black">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-base">Regex Tester</h3>

                <button
                    onClick={() => setShowHelp((v) => !v)}
                    className="text-xs px-2 py-1 rounded bg-slate-200 hover:bg-slate-400"
                >
                    {showHelp ? "Hide" : "How to use"}
                </button>
            </div>

            {showHelp ? (
                <div className="text-xs bg-gradient-to-b from-white to-blue-300 shadow-md border border-slate-700 rounded p-3 space-y-2">
                    <p className="text-slate-700">
                        <b>Regex</b> (Regular Expression) is used to find patterns in text.
                    </p>

                    <div>
                        <p className="font-semibold">Pattern</p>
                        <p className="text-slate-700">
                            Write what you want to search.
                        </p>
                        <code className="block mt-1 bg-slate-200 p-1 rounded">
                            \\bword\\b → finds whole word "word"
                        </code>
                    </div>

                    <div>
                        <p className="font-semibold">Flags</p>
                        <ul className="list-disc list-inside text-slate-800">
                            <li><b>g</b> → find all matches (required)</li>
                            <li><b>i</b> → ignore case (Email = email)</li>
                            <li><b>m</b> → multiline (^ and $ per line)</li>
                            <li><b>s</b> → dot matches newline</li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-semibold">Presets</p>
                        <p className="text-slate-700">
                            Quick regex for Email, URL and Phone.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold">Copy matches</p>
                        <p className="text-slate-700">
                            Copies only matched text, one per line.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold">Highlight toggle</p>
                        <p className="text-slate-700">
                            Turn highlighting ON/OFF without changing matches.
                        </p>
                    </div>
                </div>
            )
                :
                <>
                    <div className="flex gap-2 flex-wrap">
                        {Object.keys(PRESETS).map((key) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setPattern(PRESETS[key]);
                                    setFlags("gi");
                                }}
                                className="px-2 py-1 text-xs rounded bg-slate-200 hover:bg-slate-400"
                            >
                                {key}
                            </button>
                        ))}
                    </div>

                    {/* Regex Inputs */}
                    <div className="flex gap-2">
                        <input
                            className="flex-1 px-2 py-1 rounded shadow-md bg-slate-300 outline-none"
                            placeholder="Regex pattern"
                            value={pattern}
                            onChange={(e) => setPattern(e.target.value)}
                        />
                        <input
                            className="w-16 px-2 py-1 rounded shadow-md bg-slate-300 outline-none"
                            placeholder="flags"
                            value={flags}
                            onChange={(e) => setFlags(e.target.value)}
                        />
                    </div>

                    {/* Text Input */}
                    <textarea
                        className="w-full min-h-[90px] px-2 py-1 rounded shadow-md bg-slate-300 outline-none"
                        placeholder="Enter text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-700">
                            Matches: <b>{matches.length}</b>
                        </span>

                        <div className="flex gap-2">
                            <button
                                onClick={copyMatches}
                                className="px-2 py-1 text-xs rounded bg-indigo-600 hover:bg-indigo-500"
                            >
                                Copy matches
                            </button>

                            <button
                                onClick={() => setHighlight((v) => !v)}
                                className="px-2 py-1 text-xs rounded bg-slate-200 hover:bg-slate-600"
                            >
                                {highlight ? "Hide highlight" : "Show highlight"}
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-xs">{error}</p>}

                    {/* Output */}
                    <div className="
                                   p-2
                                   min-h-[70px]
                                   max-h-[160px]
                                   overflow-y-auto
                                   rounded
                                   shadow-md
                                   bg-slate-300
                                   whitespace-pre-wrap
                                   text-black
                                 ">
                        {output}
                    </div>


                </>
            }


        </div>
    );
};

export default RegexTester;
