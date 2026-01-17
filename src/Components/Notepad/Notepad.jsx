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

  const downclick = () => {
    const updated = editorRef.current.innerText.toLowerCase();
    editorRef.current.innerText = updated;
    safeStorageSet("key", updated);
  };

  const copy = () => {
    const text = editorRef.current?.innerText;
    navigator.clipboard.writeText(text || "");
  };

  const paste = async () => {
    const text = await navigator.clipboard.readText();
    if (editorRef.current) {
      editorRef.current.innerHTML += text;
      safeStorageSet("key", editorRef.current.innerHTML);
    }
  };

  const capital1st = () => {
    const updated = editorRef.current.innerText
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    editorRef.current.innerText = updated;
    safeStorageSet("key", updated);
  };

  const eraseall = () => {
    if (editorRef.current) editorRef.current.innerHTML = "";
    setlistno(1);
    setlistType("none");
    safeStorageSet("key", "");
  };

  const replace = () => {
    setSelect(!select);
  };

  const closemodal = () => {
    setSelect(false);
    const replaced = editorRef.current.innerHTML.split(prevword).join(newword);
    editorRef.current.innerHTML = replaced;
    safeStorageSet("key", replaced);
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
    const link = document.createElement("a");
    const content = editorRef.current.innerText;
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "sample.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const onEnterPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const selection = window.getSelection();
      if (!selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      range.deleteContents();

      let node = null;

      if (listType === "number") {
        const br = document.createElement("br");
        node = document.createTextNode(`${listno}. `);
        range.insertNode(br);
        range.collapse(false);
        range.insertNode(node);
        setlistno(listno + 1);
      } else if (listType === "bullet") {
        const br = document.createElement("br");
        node = document.createTextNode("• ");
        range.insertNode(br);
        range.collapse(false);
        range.insertNode(node);
      } else {
        const br1 = document.createElement("br");
        const br2 = document.createElement("br");
        range.insertNode(br2);
        range.setStartAfter(br2);
        range.insertNode(br1);
        range.setStartAfter(br1);
      }

      if (node) {
        range.setStartAfter(node);
      }

      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <div className='smooth-entry'>

      <div className={`flex mt-2 flex-wrap gap-2 justify-center items-center`} >

        <button title='Capitalise' className="text-center font-bold w-8 border-transparent" onClick={capital1st}>
          Aa
        </button>
        <button title='all small' className="text-center font-bold w-8 border-transparent" onClick={downclick}>
          aa
        </button>
        <button style={{ backgroundColor: font == 'italic' ? "grey" : "transparent" }} title='italic' className="text-center italic w-8 border-transparent" onClick={fontstylecng}>
          <FormatItalicIcon />
        </button>
        <button title='bullets' style={{
          backgroundColor: listType === "bullet" ? "grey" : "transparent"
        }}
          className="text-center font-bold w-8 border-transparent" onClick={() => listType !== "bullet" ? setlistType("bullet") : setlistType("none")}>
          :
        </button>
        <button title='number list' style={{
          backgroundColor: listType === "number" ? "grey" : "transparent"
        }}
          className="text-center font-bold w-8 border-transparent" onClick={() => listType !== "number" ? setlistType("number") : setlistType("none")}>
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

        <select title='font-size' id="cards2" onChange={fontsizecng} className='select rounded-2xl w-16 focus:outline-none border-transparent'>
          <option value="larger">Size</option>
          <option value="larger">normal</option>
          <option value="medium">very small</option>
          <option value="large">small</option>
          <option value="x-large">large</option>
          <option value="xx-large">larger</option>
        </select>
        <button title='replace' className="text-center w-16 font-bold border-transparent" onClick={() => setshowtab(!showtab)}>
          Tabs
        </button>
        <button title='download as .txt' className="text-center w-8 border-transparent" onClick={requestTarunToDownload}>
          <DownloadIcon />
        </button>
      </div>
      <UseAnimation
        Component={<Replacemodal closemodal={closemodal} newword={newword} prevword={prevword} setNewword={setNewword} setPrevword={setPrevword} />}
        duration={150}
        isshowComponent={select}
        mountAnimationclass={"smooth-entry"}
        unmountAnimationclass={"smooth-exit"}
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
        mountAnimationclass={"smooth-entry"}
        unmountAnimationclass={"smooth-exit"}
      />

      {showtab && <div className="flex justify-center items-center pt-5 gap-2">
        {tab.map((item) => (
          <Tabs key={item.sno} tab={tab} activeTab={activeTab} ontabClick={ontabClick} removeTab={removeTab} data={item} />
        ))}
        <button className='p-2 w-8 font-bold' onClick={openAddTabModal}>+</button>
        <button className='p-2 w-20' onClick={closeAllTabs}>close all</button>
      </div>}

      <div className="flex justify-center items-center p-2">
        <textarea
          value={tab.find(t => t.sno === activeTab)?.data || ""}
          onChange={(e) => {
            const value = e.target.value;
            settab(prev =>
              prev.map(t =>
                t.sno === activeTab ? { ...t, data: value } : t
              )
            );
          }}
          onKeyDown={onEnterPress}
          placeholder="write something..."
          style={{
            fontStyle: font,
            fontSize: size,
            minHeight: "62vh",
            width: "96vw",
          }}
          className="shadow-[0px_5px_5px_rgba(13,69,77,0.5)] border border-slate-400 rounded-2xl m-4 mx-auto p-3 md:min-h-[60vh] text-lg focus:outline-none resize-none"
        />

      </div>
      <div className='md:text-base text-xs font-semibold bg-gradient-to-b from-white to-blue-300 px-10 w-full text-start'>words - {notes.split(" ").filter((a) => a != 0).length} and characters - {notes.length}</div>
    </div>

  )
}

export default Notepad