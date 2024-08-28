import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context';

const Sidebar = () => {

    const [extended, setExtended] = useState(false);
    const {darkMode, onSent, prevPrompts, setRecentPrompt, newChat,setShowResult, userData, setUserData, setAllInputs, allInputs, save} = useContext(Context);

    const loadPrompt = async (prompt) => {
        setShowResult(true);
        setUserData(prevUserData => prevUserData.filter(user => user !== prompt));
        setUserData(prev => [...prev, allInputs]);
        setAllInputs(prompt)
    }

    return (
        <div className={`sidebar ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className='top'>
                <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt='Kaputt' />
                <div onClick={()=>newChat()} className='new-chat'>
                    <img src={assets.plus_icon} alt='Chat' />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {userData.map((item, index) => (
                            <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                <img src={assets.message_icon} alt='Message' />
                                <p>{item.user[item.user.length - 1]?.slice(0, 18)}...</p>
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <div className='bottom'>
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Question" />
                    {extended? <p>Help & Support</p> :null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="history" />
                    {extended? <p>Activity</p> :null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Question" />
                    {extended? <p>Settings</p> :null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
