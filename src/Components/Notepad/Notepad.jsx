import React, { useEffect, useState, useRef, useCallback } from 'react'
import Replacemodal from './Replacemodal'
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import DownloadIcon from '@mui/icons-material/Download';
import UseAnimation from '../../customhooks/TarunAnimation';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import Tabs from './Tabs';
import AddTabModal from './addTabModal';
import { safeStorageGet, safeStorageSet } from "../../utils/safeStorage";

function Notepad() {
  const [notes, setNotes] = useState("");
  const [select, setSelect] = useState(false);
  const [showAddTabModal, setShowAddTabModal] = useState(false);
  const [tabTitle, setTabTitle] = useState("Tab");
  const [prevword, setPrevword] = useState("");
  const [newword, setNewword] = useState("");
  const [font, setFont] = useState("normal");
  const [size, setSize] = useState("larger");
  const [showtab, setshowtab] = useState(false);
  // const [tab, settab] = useState([{ sno: 1, data: "", title: "" }]);
  const [activeTab, setactiveTab] = useState(1);
  const [listno, setlistno] = useState(1);
  const [listType, setlistType] = useState("none");
  const [tab, settab] = useState([
    { sno: 1, data: "", title: "" }
  ]);


  useEffect(() => {
    const loadTabs = async () => {
      const savedTabs = (await safeStorageGet("tab")) || [{ sno: 1, data: "", title: "" }];
      const savedActiveTab = parseInt(await safeStorageGet("activeTab")) || 1;
      settab(savedTabs);
      setactiveTab(savedActiveTab);

      // const activeTabData = savedTabs.find(t => t.sno === savedActiveTab);
    };
    loadTabs();
  }, []);

  useEffect(() => {
    safeStorageSet("activeTab", activeTab);
  }, [activeTab]);

  const removeTab = (sno) => {
    const updatedTabs = tab.filter(t => t.sno !== sno);
    const newActive = updatedTabs[0]?.sno || 1;

    settab(updatedTabs);
    setactiveTab(newActive);
  };

  const ontabClick = (sno) => {
    if (sno === activeTab) return;
    // saveActiveTabData();
    setactiveTab(sno);
  };



  const closeAllTabs = () => {
    const defaultTab = [{ sno: 1, data: "", title: "" }];
    settab(defaultTab);
    setactiveTab(1);
  };

  const openAddTabModal = () => {
    setTabTitle("");
    setShowAddTabModal(true);
  };

  const confirmAddTab = () => {
    if (!tabTitle.trim()) {
      alert("Please enter a title.");
      return;
    }

    const newSno = tab.length ? tab[tab.length - 1].sno + 1 : 1;
    const newTab = { sno: newSno, data: "", title: tabTitle.trim() };

    settab(prev => [...prev, newTab]);
    setactiveTab(newSno);

    // if (editorRef.current) editorRef.current.innerHTML = "";
    setShowAddTabModal(false);
  };

  const saveTimeout = useRef(null);

  useEffect(() => {
    clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      safeStorageSet("tab", tab);
    }, 300);

    return () => clearTimeout(saveTimeout.current);
  }, [tab]);

  const updateActiveTabText = (newText) => {
    settab(prev =>
      prev.map(t =>
        t.sno === activeTab ? { ...t, data: newText } : t
      )
    );
  };


  const downclick = () => {
    const active = tab.find(t => t.sno === activeTab);
    if (!active) return;
    updateActiveTabText(active.data.toLowerCase());
  };


  const copy = () => {
    const active = tab.find(t => t.sno === activeTab);
    navigator.clipboard.writeText(active?.data || "");
  };


  const paste = async () => {
    const clipText = await navigator.clipboard.readText();
    const active = tab.find(t => t.sno === activeTab);

    if (!active) return;

    updateActiveTabText(active.data + clipText);
  };


  const capital1st = () => {
    const active = tab.find(t => t.sno === activeTab);
    if (!active) return;

    const updated = active.data
      .split(" ")
      .map(word =>
        word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : ""
      )
      .join(" ");

    updateActiveTabText(updated);
  };


  const eraseall = () => {
    updateActiveTabText("");
    setlistno(1);
    setlistType("none");
  };


  const replace = () => {
    setSelect(prev => !prev);
  };


  const closemodal = () => {
    const active = tab.find(t => t.sno === activeTab);
    if (!active) return;

    const replaced = active.data.split(prevword).join(newword);

    updateActiveTabText(replaced);
    setSelect(false);
  };


  const fontstylecng = () => {
    if (font == 'normal') {
      setFont('italic');
    } else { setFont('normal'); }
  };

  const fontsizecng = () => {
    let cards2 = document.getElementById('cards2');
    setSize(cards2.value);
    document.execCommand('fontSize', false, 4);
  };

  const requestTarunToDownload = () => {
    const active = tab.find(t => t.sno === activeTab);
    if (!active) return;

    const content = active.data || "";
    const blob = new Blob([content], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${active.title || "note"}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);
  };


  const onEnterPress = (e) => {
    if (e.key !== "Enter" || e.shiftKey) return;

    e.preventDefault();

    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const active = tab.find(t => t.sno === activeTab);
    if (!active) return;

    let insertText = "\n";

    if (listType === "number") {
      insertText = `\n${listno}. `;
      setlistno(prev => prev + 1);
    }
    else if (listType === "bullet") {
      insertText = `\n• `;
    }

    const updatedText =
      active.data.slice(0, start) +
      insertText +
      active.data.slice(end);

    // Update state
    settab(prev =>
      prev.map(t =>
        t.sno === activeTab ? { ...t, data: updatedText } : t
      )
    );

    // Restore cursor position (VERY important)
    requestAnimationFrame(() => {
      textarea.selectionStart = textarea.selectionEnd =
        start + insertText.length;
    });
  };

  return (
    <div className='smooth-entry'>

      <div className={`flex mt-1 flex-wrap gap-2 justify-center items-center`} >

        <button title='Capitalise' className="text-center text-sm font-bold w-8 border-transparent" onClick={capital1st}>
          Aa
        </button>
        <button title='all small' className="text-center text-sm font-bold w-8 border-transparent" onClick={downclick}>
          aa
        </button>
        {/* <button style={{ backgroundColor: font == 'italic' ? "grey" : "transparent" }} title='italic' className="text-center italic w-8 border-transparent" onClick={fontstylecng}>
          <FormatItalicIcon />
        </button> */}
        <button title='bullets' style={{
          backgroundColor: listType === "bullet" ? "grey" : "transparent"
        }}
          className="text-center font-bold w-8 border-transparent" onClick={() => listType !== "bullet" ? setlistType("bullet") : setlistType("none")}>
          :
        </button>
        <button title='number list' style={{
          backgroundColor: listType === "number" ? "grey" : "transparent"
        }}
          className="text-center font-bold text-sm w-8 border-transparent" onClick={() => listType !== "number" ? setlistType("number") : setlistType("none")}>
          1.
        </button>

        <button title='delete' className="text-center w-8 border-transparent" onClick={eraseall}>
          <DeleteIcon />
        </button>
        <button title='copy' className="text-center w-8 border-transparent" onClick={copy}>
          <ContentCopyIcon />
        </button>
        <button title='paste' className="text-center w-8 border-transparent" onClick={paste}>
          <ContentPasteGoIcon />
        </button>
        <button title='replace' className="text-center w-8 border-transparent" onClick={replace}>
          <PublishedWithChangesIcon />
        </button>

        <select title='font-size' id="cards2" onChange={fontsizecng} className='select rounded-2xl w-14 text-sm focus:outline-none border-transparent'>
          <option value="larger">Size</option>
          <option value="larger">normal</option>
          <option value="medium">very small</option>
          <option value="large">small</option>
          <option value="x-large">large</option>
          <option value="xx-large">larger</option>
        </select>
        <button title='tabs' className="text-center w-10 text-sm font-bold border-transparent" onClick={() => setshowtab(!showtab)}>
          Tabs
        </button>
        {/* <button title='clipboard' className="text-center w-20 text-sm font-bold border-transparent" onClick={() => console.log("clipboard")}>
          Clipboard
        </button> */}
        <button title='download as .txt' className="text-center w-8 border-transparent" onClick={requestTarunToDownload}>
          <DownloadIcon />
        </button>
      </div>
      <UseAnimation
        Component={<Replacemodal closemodal={closemodal} newword={newword} prevword={prevword} setNewword={setNewword} setPrevword={setPrevword} />}
        duration={150}
        isshowComponent={select}
        mountAnimationclass={"tab-enter"}
        unmountAnimationclass={"tab-exit"}
      />
      <UseAnimation
        Component={<AddTabModal
          tabTitle={tabTitle}
          setTabTitle={setTabTitle}
          onConfirm={confirmAddTab}
          onClose={() => setShowAddTabModal(false)}
        />}
        duration={150}
        isshowComponent={showAddTabModal}
        mountAnimationclass={"tab-enter"}
        unmountAnimationclass={"tab-exit"}
      />

      <UseAnimation
        isshowComponent={showtab}
        duration={200}
        mountAnimationclass="tab-enter"
        unmountAnimationclass="tab-exit"
        Component={
          <div
            className="
        flex items-center justify-center gap-2 px-3 p-1
        overflow-x-auto overflow-y-hidden
        scrollbar-hide mt-2 
        bg-white 
      "
          >
            {tab.map((item) => (
              <Tabs
                key={item.sno}
                tab={tab}
                activeTab={activeTab}
                ontabClick={ontabClick}
                removeTab={removeTab}
                data={item}
              />
            ))}

            <button
              className="min-w-[32px] h-8 z-10 rounded-full bg-gray-100 font-bold hover:bg-gray-200 transition"
              onClick={openAddTabModal}
            >
              +
            </button>

            <button
              className="min-w-[80px] h-8 z-10 rounded-xl bg-red-50 text-red-600 text-sm font-semibold hover:outline-red-500 hover:bg-red-100 transition"
              onClick={closeAllTabs}
            >
              Close all
            </button>
          </div>
        }
      />

      <div className="flex justify-center items-center p-2">
        <textarea
          value={tab.find(t => t.sno === activeTab)?.data || ""}
          onChange={(e) => updateActiveTabText(e.target.value)}
          onKeyDown={onEnterPress}
          placeholder="write something..."
          style={{
            fontStyle: font,
            fontSize: size,
            minHeight: "56vh",
            width: "96vw",
          }}
          className="shadow-[0px_5px_5px_rgba(13,69,77,0.5)] border border-slate-400 rounded-2xl m-1 mx-auto p-3 md:min-h-[60vh] text-lg focus:outline-none resize-none"
        />

      </div>
      <div className='md:text-base text-xs font-semibold bg-gradient-to-b from-white to-blue-300 px-10 w-full text-start'>words - {notes.split(" ").filter((a) => a != 0).length} and characters - {notes.length}</div>
    </div>

  )
}

export default Notepad