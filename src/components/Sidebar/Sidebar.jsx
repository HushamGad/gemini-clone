import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {
    const [extended, setExtended] = useState(false)
    const { setRecentPrompt, prevPrompt, onSent,newChat } = useContext(Context)

    const loadPrompt = async (prompt) =>{
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
    return (
        <div className='sidebar'>
                
            <div className="top">
            <img className='menu' onClick={() => setExtended(prev => !prev)} src={assets.menu_icon} alt="Menu Icon" />
                <div onClick={()=>newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="Plus Icon" />
                    {extended && <span>New Chat</span>}
                </div>
                {extended &&
                    <div className="recent">
                        <h2 className="recent-title">Recent</h2>
                        {prevPrompt.map((item, index) => {
                            return (
                                <div onClick={()=>loadPrompt(item)} className="recent-entry">
                                    <img src={assets.message_icon} alt="Message Icon" />
                                    <span key={index}>{item.slice(0,18)} ...</span>
                                </div>
                            )
                        })}

                    </div>
                }
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Help Icon" />
                    {extended && <span>Help</span>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="History Icon" />
                    {extended && <span>Activity</span>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Settings Icon" />
                    {extended && <span>Setting</span>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
