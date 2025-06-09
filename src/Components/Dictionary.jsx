import React, { useRef, useState } from 'react'
import speaker from '../assets/images/speaker.png'

const Dictionary = () => {
    const [input, setInput] = useState('');
    const [SRCsound, setSRCsound] = useState('');
    const [Result, setResult] = useState();
    const [ResultImage, setResultImage] = useState('');
    const currentsong = useRef()

    const pronounciation = () => {
        setSRCsound(Result && Result[0].phonetics[0].audio)
        currentsong.current.play()
    }

    const searchWord = async () => {
        if (input.length) {
            let data
            let url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
            let imageurl = "https://source.unsplash.com/featured/200x200?"
            setResultImage(imageurl + input)
            // let imagequery = imageurl + input
            let qwery = url + input
            const response = await fetch(qwery);
            data = await response.json();
            setResult(data)
            // console.table(data);
        }
        else {
            alert("enter any text")
        }
    }

    const onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            searchWord()
        }
    }

    const displaychange = (e) => {
        setInput(e.target.value);
    };

    return (
        <>
            <audio src={SRCsound} loop={false} ref={currentsong} crossOrigin={'anonymous'}></audio>
            <div className="smooth-entry bg-gradient-to-b min-h-[75vh] from-white to-blue-300 flex flex-col justify-center items-center mt-0">
                <div className="dictionarybox flex md:flex-row flex-col justify-center items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={displaychange}
                        onKeyDown={onEnterPress}
                        placeholder="enter word"
                        className="focus:outline-none w-full max-w-96 bg-white wordsearch shadow-[0px_5px_5px_rgba(13,69,77,0.5)]"
                    ></input>
                    <div className="flex flex-row justify-center items-center wrap">
                        <button className="m-3 bg-slate-100" onClick={searchWord}>Search</button>
                        <button className="m-3 bg-slate-100" onClick={() => window.location.reload()}>Refresh</button>
                    </div>
                </div>
                <div className={`resultbox ${Result ? "flex" : "hidden"} flex-col justify-center items-center`}>
                    {
                        Result && Result.message ? <div className='flex flex-col justify-center items-center'>
                            <h1>{Result.title}</h1>
                            <div>{Result.message}</div>
                            <div>{Result.resolution}</div>
                            </div> : Result ? <>
                            <div className="flex flex-col justify-center items-center">
                                {/* <img className='resultimagedictionary' src={ResultImage} alt={input} /> */}
                                <div className="flex justify-center items-center">
                                    <h1 className='text-2xl text-blue-900 font-bold'>{Result && Result[0].word.split(" ").map((n) => n.slice(0, 1).toUpperCase().concat(n.slice(1).toLowerCase()))}</h1>
                                    <img className='speakerlogo' src={speaker} alt="speak" onClick={pronounciation} />
                                </div>
                                <h4><b className='textdict'>Synonym - </b>
                                    {Result && Result[0].meanings[0].synonyms.toString().split(",").map((e) => { return e.concat(" ") })}
                                </h4>
                            </div>
                            <div className='flex flex-col justify-center items-center meaningbox'>
                                <div><b className='textdict'>Meaning - </b>
                                    {Result && Result[0].meanings[0].definitions.length > 2 ? Result && Result[0].meanings[0].definitions[0].definition + "," +
                                        Result[0].meanings[0].definitions[1].definition : Result && Result[0].meanings[0].definitions[0].definition}
                                </div>
                                <div><b className='textdict'>Verb - </b>
                                    {Result && Result[0].meanings[0].definitions[0].definition}
                                </div>
                            </div>
                        </>: <><h1>Output -</h1></>
                    }
                </div>
            </div>
        </>
    )
}

export default Dictionary