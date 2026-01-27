import React from 'react'

const Tabs = ({ data, ontabClick, removeTab, tab, activeTab }) => {
    return (
        <div className={`relative ${activeTab == data.sno && "bg-blue-200"} hover:bg-slate-400 flex justify-start items-center text-black no-underline tab min-w-24 max-h-8 rounded-xl`}>
            <p className='pl-4' onClick={() => ontabClick(data.sno)}>{data.title || `Tab ${data.sno}`}</p>
            {tab.length > 1 && <p onClick={() => removeTab(data.sno)} title='close tab' className='absolute hover:text-xl right-0 flex justify-center items-center w-7 h-7 text-red-600'>X</p>}
        </div>
    )
}

export default Tabs