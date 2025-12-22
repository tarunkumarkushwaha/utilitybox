import { useState, useEffect } from "react";

const ColorPicker = () => {
    const [hex, setHex] = useState("#1f2937");
    const [rgb, setRgb] = useState("rgb(31, 41, 55)");
    const [hsl, setHsl] = useState("hsl(215, 28%, 17%)");
    const [copied, setCopied] = useState("");
    const [colorHistory, setColorHistory] = useState([]);


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



    const pickColor = async () => {
        if (!window.EyeDropper) {
            alert("Color picker not supported");
            return;
        }

        try {
            const eyeDropper = new window.EyeDropper();
            const { sRGBHex } = await eyeDropper.open();
            updateFromHex(sRGBHex);
        } catch { }
    };

    const updateFromHex = async (hexValue) => {
        setHex(hexValue);

        const r = parseInt(hexValue.slice(1, 3), 16);
        const g = parseInt(hexValue.slice(3, 5), 16);
        const b = parseInt(hexValue.slice(5, 7), 16);

        const rgbValue = `rgb(${r}, ${g}, ${b})`;
        const hslValue = rgbToHsl(r, g, b);

        setRgb(rgbValue);
        setHsl(hslValue);

        const newColor = {
            hex: hexValue,
            rgb: rgbValue,
            hsl: hslValue,
        };

        // load old history
        const prev = (await safeStorageGet("colorHistory")) || [];

        // remove duplicate hex if exists
        const filtered = prev.filter(c => c.hex !== hexValue);

        // add to top & limit length
        const updated = [newColor, ...filtered].slice(0, 8);

        setColorHistory(updated);

        safeStorageSet("pickedColor", newColor);
        safeStorageSet("colorHistory", updated);
    };

    const rgbToHsl = (r, g, b) => {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s;
        const l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                default:
                    h = (r - g) / d + 4;
            }
            h /= 6;
        }

        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
            l * 100
        )}%)`;
    };

    const copy = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopied(`${label} code copied`);
        setTimeout(() => setCopied(""), 1500);
    };

    useEffect(() => {
        const loadColor = async () => {
            const saved = await safeStorageGet("pickedColor");
            const history = (await safeStorageGet("colorHistory")) || [];

            if (saved) {
                setHex(saved.hex);
                setRgb(saved.rgb);
                setHsl(saved.hsl);
            }

            setColorHistory(history);
        };

        loadColor();
    }, []);

    return (
        <div className=" p-4 bg-gradient-to-b h-[75vh] from-white to-blue-300 shadow-md text-gray-800">
            {copied && (
                <div className="fixed top-3 left-1/2 -translate-x-1/2 px-3 py-1.5
                  text-xs rounded-md bg-gray-900 text-white shadow-lg
                  animate-fade">
                    {copied}
                </div>
            )}

            <h3 className="text-sm text-center font-semibold mb-3"> Color Picker</h3>



            <div className="flex items-center gap-3 mb-4">
                <div
                    className="w-10 h-10 rounded-md border"
                    style={{ backgroundColor: hex }}
                />
                <button
                    onClick={pickColor}
                    className="flex-1 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800 transition"
                >
                    Pick Color
                </button>
            </div>
            <p className="text-[10px] text-gray-900 mt-2">
                Popup may close while picking — color will be saved
            </p>


            <div className="space-y-2 text-xs">
                <Value label="HEX" value={hex} onCopy={copy} />
                <Value label="RGB" value={rgb} onCopy={copy} />
                <Value label="HSL" value={hsl} onCopy={copy} />

            </div>

            <p className="text-[10px] text-gray-900 mt-3">
                Click any value to copy
            </p>

            {colorHistory.length > 0 && (
                <div className="mt-3">
                    <p className="text-[16px] text-center text-gray-900 mb-1">Recent colors</p>

                    <div className="flex gap-2 flex-wrap p-5 border-black rounded-xl bg-white">
                        {colorHistory.map((c, i) => (
                            <div
                                key={i}
                                title={c.hex}
                                onClick={() => copy(c.hex, "HEX")}
                                className="w-6 h-6 rounded border-black cursor-pointer border hover:scale-110 transition"
                                style={{ backgroundColor: c.hex }}
                            />
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

const Value = ({ label, value, onCopy }) => (
    <div
        onClick={() => onCopy(value, label)}
        className="flex justify-between items-center px-2 py-1 rounded cursor-pointer hover:bg-gray-100"
    >
        <span className="font-medium">{label}</span>
        <span className="font-mono">{value}</span>
    </div>
);


export default ColorPicker;
