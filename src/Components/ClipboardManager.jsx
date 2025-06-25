import React, { useEffect, useState } from "react";

const MAX_ENTRIES = 10;

const ClipboardManager = () => {
  const [entries, setEntries] = useState([]);

  // Load from storage
  useEffect(() => {
    chrome.storage.local.get(["clipboardHistory"], (res) => {
      setEntries(res.clipboardHistory || []);
    });

    // Listener for clipboard updates from background
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === "CLIPBOARD_UPDATE") {
        setEntries(msg.payload);
      }
    });
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Copied:", text);
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">📋 Clipboard Manager</h2>
      {entries.length === 0 ? (
        <p className="text-sm text-gray-500">No recent clipboard entries.</p>
      ) : (
        <ul className="space-y-2 max-h-60 overflow-auto">
          {entries.map((text, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg text-sm"
            >
              <span className="truncate w-48" title={text}>{text}</span>
              <button
                className="text-blue-600 hover:underline text-xs"
                onClick={() => handleCopy(text)}
              >
                Copy
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClipboardManager;
