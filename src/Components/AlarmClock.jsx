import React, { useState, useRef, useEffect } from 'react'

const Calendar = () => {
    const today = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    const blanks = Array(firstDay).fill(null);
    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="w-full">
            <div className="text-center font-semibold text-lg mb-2">
                {monthNames[today.getMonth()]} {today.getFullYear()}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
                {days.map((day, idx) => (
                    <div key={idx} className="text-gray-600">{day}</div>
                ))}
                {[...blanks, ...dates].map((date, i) => (
                    <div
                        key={i}
                        className={`h-8 flex items-center justify-center rounded 
              ${date === today.getDate() ? "bg-blue-500 text-white" : "hover:bg-gray-200"}
            `}
                    >
                        {date || ""}
                    </div>
                ))}
            </div>
        </div>
    );
};


const AlarmClock = () => {
    const [clockSetting, setclockSetting] = useState(false);
    const [alarmON, setalarmON] = useState(false);
    const [time, settime] = useState("Fetching time");
    const [alarmMin, setalarmMin] = useState(0);
    const [alarmSec, setalarmSec] = useState(0);
    const [alarmHr, setalarmHr] = useState(1);
    const [alarmAMPM, setalarmAMPM] = useState("AM");
    const [ampm, setampm] = useState("");
    const [reminder, setreminder] = useState("");
    const [date, setdate] = useState("");
    const currentsong = useRef(null);

    const src = "https://cdn.pixabay.com/download/audio/2022/11/25/audio_fb45cd67b0.mp3?filename=kirby-alarm-clock-127079.mp3";
    const minOptions = Array.from({ length: 60 }, (_, i) => i);
    const hrsOptions = Array.from({ length: 12 }, (_, i) => i + 1);

    // Live Clock
    useEffect(() => {
        const updateClock = () => {
            const t = new Date();
            const hRaw = t.getHours();
            const h = hRaw % 12 === 0 ? 12 : hRaw % 12;
            const m = t.getMinutes();
            const s = t.getSeconds();
            const ampmVal = hRaw < 12 ? "AM" : "PM";
            settime(`${h.toString().padStart(2, "0")} :${m.toString().padStart(2, "0")} :${s.toString().padStart(2, "0")}`);
            setampm(ampmVal);
            setdate(`${t.getDate()} - ${t.getMonth() + 1} - ${t.getFullYear()}`);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    const alarmSet = () => {
        chrome.runtime.sendMessage(
            {
                type: "SET_ALARM",
                text:reminder,
                data: {
                    hr: alarmHr,
                    min: alarmMin,
                    sec: alarmSec,
                    ampm: alarmAMPM,
                },
            },
            (response) => {
                if (response?.status) {
                    console.log(response.status);
                    setalarmON(true);
                }
            }
        );
    };


    // Clear Alarm
    const alarmClear = () => {
        chrome.runtime.sendMessage({ type: "CLEAR_ALARM" }, (response) => {
            if (response?.status) {
                console.log(response.status);
                setalarmON(false);
                if (currentsong.current) {
                    currentsong.current.pause();
                }
            }
        });
    };

    return (
        <>
            <audio src={src} loop={true} ref={currentsong} crossOrigin={'anonymous'}></audio>

            <div
                className="clock-body smooth-entry min-h-screen flex flex-col justify-start items-center p-4 bg-cover bg-center"
            >
                {/* Clock Section */}
                <div
                    className="flex flex-col justify-center items-center cursor"
                    title="Click to set reminder"
                    onClick={() => setclockSetting(true)}
                >
                    <div className="flex justify-center items-center mb-2">
                        <div className="text-6xl sm:text-7xl font-bold">{time}</div>
                        <div className="text-3xl sm:text-4xl font-bold ml-2">{ampm}</div>
                    </div>
                    <div className="text-xl sm:text-2xl mb-4 text-center">{date}</div>
                </div>

                <button className='w-32 m-2' onClick={() => setclockSetting(true)}>Set Reminder</button>

                {/* Calendar Section */}
                <div className="bg-white bg-opacity-70 text-black rounded-xl p-4 shadow-md w-full max-w-[500px]">
                    <Calendar />
                </div>
            </div>


            {clockSetting && (
                <div className="fixed inset-0 bg-black/50 transition-opacity duration-200 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Set Reminder</h2>
                            
                            <button
                                className="text-red-500 font-bold text-xl"
                                onClick={() => setclockSetting(false)}
                                title="Close"
                            >
                                X
                            </button>
                        </div>

                        <input
                                type="text"
                                className="w-full cursor-text text-center border border-black h-10 rounded-xl mb-4 px-2 focus:outline-none border-transparent select"
                                placeholder="Text"
                                value={reminder}
                                onChange={(e) => {
                                    setreminder(e.target.value );
                                }}
                            />

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                            <select
                                className="border rounded-lg p-2 text-center text-sm"
                                value={alarmHr}
                                onChange={(e) => setalarmHr(e.target.value)}
                            >
                                {hrsOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option.toString().padStart(2, "0")}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="border rounded-lg p-2 text-center text-sm"
                                value={alarmMin}
                                onChange={(e) => setalarmMin(e.target.value)}
                            >
                                {minOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option.toString().padStart(2, "0")}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="border rounded-lg p-2 text-center text-sm"
                                value={alarmSec}
                                onChange={(e) => setalarmSec(e.target.value)}
                            >
                                {minOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option.toString().padStart(2, "0")}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="border rounded-lg p-2 text-center text-sm"
                                value={alarmAMPM}
                                onChange={(e) => setalarmAMPM(e.target.value)}
                            >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>

                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium"
                            onClick={alarmON ? alarmClear : alarmSet}
                        >
                            {alarmON ? "STOP REMINDER" : "SET REMINDER"}
                        </button>
                    </div>
                </div>
            )}


        </>
    )
}

export default AlarmClock