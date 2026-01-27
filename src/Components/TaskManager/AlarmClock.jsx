import React, { useState, useRef, useEffect } from 'react'
import ModalPortal from '../ModalPortal';

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
                text: reminder,
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

            <div className='flex justify-center items-center'>
                <button
                    className="text-gray-700 w-28 mb-2"
                    onClick={() => setclockSetting(!clockSetting)}
                    title="Close"
                >
                    Set Reminder
                </button>
            </div>

            {clockSetting && (
                <ModalPortal>
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center">


                        <div
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setclockSetting(false)}
                        />


                        <div
                            className="
          relative z-[10001]
          w-[90%] max-w-md
          bg-white
          rounded-2xl
          shadow-2xl
          p-6
          animate-modal-in
        "
                        >

                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Set Reminder
                                </h2>

                                <button
                                    className="text-gray-500 hover:text-red-500 text-xl font-bold"
                                    onClick={() => setclockSetting(false)}
                                    title="Close"
                                >
                                    x
                                </button>
                            </div>


                            <input
                                type="text"
                                className="
            w-full h-11 mb-4
            text-center
            rounded-xl
            border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
                                placeholder="Reminder text"
                                value={reminder}
                                onChange={(e) => setreminder(e.target.value)}
                            />


                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                                <select
                                    className="border rounded-lg p-2 text-center text-sm"
                                    value={alarmHr}
                                    onChange={(e) => setalarmHr(e.target.value)}
                                >
                                    {hrsOptions.map((h) => (
                                        <option key={h} value={h}>
                                            {h.toString().padStart(2, "0")}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className="border rounded-lg p-2 text-center text-sm"
                                    value={alarmMin}
                                    onChange={(e) => setalarmMin(e.target.value)}
                                >
                                    {minOptions.map((m) => (
                                        <option key={m} value={m}>
                                            {m.toString().padStart(2, "0")}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className="border rounded-lg p-2 text-center text-sm"
                                    value={alarmSec}
                                    onChange={(e) => setalarmSec(e.target.value)}
                                >
                                    {minOptions.map((s) => (
                                        <option key={s} value={s}>
                                            {s.toString().padStart(2, "0")}
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

                            {/* Action */}
                            <button
                                className="
            w-full py-2 rounded-xl
            bg-blue-600 text-white font-medium
            hover:bg-blue-700 transition
          "
                                onClick={alarmON ? alarmClear : alarmSet}
                            >
                                {alarmON ? "STOP REMINDER" : "SET REMINDER"}
                            </button>
                        </div>
                    </div>
                </ModalPortal>
            )}

        </>
    )
}

export default AlarmClock