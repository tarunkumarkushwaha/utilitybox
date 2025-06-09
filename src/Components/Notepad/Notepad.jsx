import React, { useEffect, useState } from 'react'
import Replacemodal from './Replacemodal'
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import UseAnimation from '../../customhooks/TarunAnimation';
import { json } from 'react-router-dom';
import Tabs from './Tabs';
import AddTabModal from './addTabModal';

function Notepad() {

  // states 
  const [notes, setNotes] = useState("");
  const [select, setSelect] = useState(false);
  const [showAddTabModal, setShowAddTabModal] = useState(false);
  const [tabTitle, setTabTitle] = useState("Tab");
  const [prevword, setPrevword] = useState("");
  const [newword, setNewword] = useState("");
  const [font, setFont] = useState("normal");
  const [size, setSize] = useState("larger");
  const [mobilenav, setmobilenav] = useState(false);
  const [showtab, setshowtab] = useState(false);
  const [tab, settab] = useState([{ sno: 1, data: "", title: "" }]);
  const [activeTab, setactiveTab] = useState(1);


  useEffect(() => {
    localStorage.setItem("tab", JSON.stringify(tab));
  }, [tab]);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const removeTab = (sno) => {
    const updatedTabs = tab.filter(t => t.sno !== sno);
    settab(updatedTabs);
    const newActive = updatedTabs.length ? updatedTabs[0].sno : 1;
    setactiveTab(newActive);
    const activeData = updatedTabs.find(t => t.sno === newActive);
    setNotes(activeData?.data || "");
  };

  const ontabClick = (sno) => {
    const clicked = tab.find(t => t.sno === sno);
    if (clicked) {
      setactiveTab(sno);
      setNotes(clicked.data);
    }
  };

  const displaychange = (e) => {
    const value = e.target.value;
    const updatedTabs = tab.map(item =>
      item.sno === activeTab ? { ...item, data: value } : item
    );
    settab(updatedTabs);
    setNotes(value);
  };

  const closeAllTabs = () => {
    const defaultTab = [{ sno: 1, data: "", title: "" }];
    settab(defaultTab);
    setactiveTab(1);
    setNotes("");
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
  const updatedTabs = [...tab, newTab];
  settab(updatedTabs);
  setactiveTab(newSno);
  setNotes("");
  setShowAddTabModal(false);
};


  useEffect(() => {
    const savedTabs = JSON.parse(localStorage.getItem("tab")) || [{ sno: 1, data: "" }];
    const savedActiveTab = parseInt(localStorage.getItem("activeTab")) || 1;

    // if (savedTabs.length > 0) {
    settab(savedTabs);
    // }
    setactiveTab(savedActiveTab);

    const activeTabData = savedTabs.find(t => t.sno === savedActiveTab);
    if (activeTabData) {
      setNotes(activeTabData.data);
    }
  }, []);

  //  click handlers
  const upclick = () => {
    setNotes(notes.toUpperCase())
    localStorage.setItem("key", notes.toUpperCase())
  }
  const downclick = () => {
    setNotes(notes.toLowerCase())
    localStorage.setItem("key", notes.toLowerCase())
  }
  const copy = () => {
    let clipbrd = document.getElementById('textbox')
    clipbrd.select()
    navigator.clipboard.writeText(clipbrd.value)
    document.getSelection().removeAllRanges()
  }
  const cut = () => {
    let clipbrd = document.getElementById('textbox')
    clipbrd.select()
    navigator.clipboard.writeText(clipbrd.value)
    document.getSelection().removeAllRanges()
    setNotes("")
    localStorage.setItem("key", "")
  }
  const paste = async () => {
    const text = await navigator.clipboard.readText();
    setNotes(notes + text)
    localStorage.setItem("key", notes + text)
  }
  const capital1st = () => {
    let arr = notes.split(" ")
    let arr2 = arr.map((n) => n.slice(0, 1).toUpperCase().concat(n.slice(1).toLowerCase()))
    setNotes(arr2.join(" "))
    localStorage.setItem("key", arr2.join(" "))
  }
  const eraseall = () => {
    setNotes("")
    localStorage.setItem("key", "")
  }
  const replace = () => {
    setSelect(!select)
  }
  const closemodal = () => {
    setSelect(false)
    setNotes(notes.split(prevword + " ").join(newword + " "))
    localStorage.setItem("key", notes.split(prevword + " ").join(newword + " "))
  }
  const fontstylecng = () => {
    let cards = document.getElementById('cards')
    setFont(cards.value)
    // localStorage.setItem("key",notes) bugg
  }
  const fontsizecng = () => {
    let cards2 = document.getElementById('cards2')
    setSize(cards2.value)
    // localStorage.setItem("key",notes)  bugg
  }
  const requestTarunToDownload = () => {
    // sourced from internet

    const link = document.createElement("a");
    const content = notes;
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "sample.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  const handleResize = () => {
    window.innerWidth < 768 ? setmobilenav(true) : setmobilenav(false)
  };

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='smooth-entry'>

      <div className={`flex mt-2 flex-wrap gap-2 justify-center items-center`} >
        <button title='Capitalise' className="text-center font-bold w-10 border-transparent" onClick={capital1st}>
          Aa
        </button>
        <button title='all small' className="text-center font-bold w-10 border-transparent" onClick={downclick}>
          aa
        </button>
        <button title='delete' className="text-center w-10 border-transparent" onClick={eraseall}>
          <DeleteIcon />
        </button>
        <button title='copy' className="text-center w-10 border-transparent" onClick={copy}>
          <ContentCopyIcon />
        </button>
        <button title='paste' className="text-center w-10 border-transparent" onClick={paste}>
          <ContentPasteGoIcon />
        </button>
        <button title='replace' className="text-center w-10 border-transparent" onClick={replace}>
          <PublishedWithChangesIcon />
        </button>
        <button title='replace' className="text-center w-16 font-bold border-transparent" onClick={() => setshowtab(!showtab)}>
          Tabs
        </button>

        <select title='style' id="cards" onChange={fontstylecng} className='select rounded-2xl w-16 focus:outline-none border-transparent'>
          <option value="normal">normal</option>
          <option value="italic">Italic</option>
        </select>
        <select title='font-size' id="cards2" onChange={fontsizecng} className='select rounded-2xl w-16 focus:outline-none border-transparent'>
          <option value="larger">Size</option>
          <option value="larger">normal</option>
          <option value="medium">very small</option>
          <option value="large">small</option>
          <option value="x-large">large</option>
          <option value="xx-large">larger</option>
        </select>
        <button title='download as .txt' className="text-center w-10 border-transparent" onClick={requestTarunToDownload}>
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
        <button className='p-2 w-10 font-bold' onClick={openAddTabModal}>+</button>
        <button className='p-2 w-20' onClick={closeAllTabs}>close all</button>
      </div>}

      <div className="flex justify-center items-center p-2">
        <textarea
          id='textbox'
          rows="10" cols="100"
          value={notes}
          onChange={displaychange}
          style={{ fontStyle: font, fontSize: size }}
          placeholder="write something..."
          className="shadow-[0px_5px_5px_rgba(13,69,77,0.5)] border border-slate-400 rounded-2xl resize-none m-4 mx-auto p-3 w-[96vw] md:min-h-[60vh] min-h-[62vh] text-lg focus:outline-none"
        ></textarea>
      </div>
      <div className='md:text-base text-xs font-semibold bg-gradient-to-b from-white to-blue-300 px-10 w-full text-start'>words - {notes.split(" ").filter((a) => a != 0).length} and characters - {notes.length}</div>
    </div>

  )
}

export default Notepad