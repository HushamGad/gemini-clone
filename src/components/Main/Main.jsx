import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
const Main = () => {

    const { input, setInput, recentPrompt, showResult, loading, resultData, onSent } = useContext(Context)
    return (
        <div className='main'>
            <nav className='nav'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Icon" />
            </nav>
            <div className="main-container">
                {!showResult
                    ? 
                    <>
                        <div className="greet">
                            <h1><span>Hello, Dev.</span><br />How can I help you today?</h1>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="Compass Icon" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="Bulb Icon" />
                            </div>
                            <div className="card">
                                <p>Brainstom team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="Message Icon" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the folowing code</p>
                                <img src={assets.code_icon} alt="Code Icon" />
                            </div>
                        </div>
                    </>
                    : 
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="User Icon" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="resut-data">
                            <img src={assets.gemini_icon} alt="Gemini Icon" />
                            {loading
                            ?
                            <div className="loader">
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            :
                            <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }
                            
                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={e => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="Gallery Icon" />
                            <img src={assets.mic_icon} alt="Mic Icon" />
                            {input&&<img onClick={() => onSent()} src={assets.send_icon} alt="Send Icon" />}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
