import React, { useContext, useEffect, useRef, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
    const { darkMode, toggleDarkMode, onSent, recentPrompt, showResult, loading, resultData, setInput, input, allInputs } = useContext(Context);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [input]);

    return (
        <div className={`main ${darkMode ? 'dark-mode' : 'light-mode'}`}> {/* Apply dark mode class */}
            <div className="nav">
                <p>Hanozri</p>
                <img src={assets.user_icon} alt='User' />
                <img className='theme' src={darkMode ? assets.moon_icon : assets.sun_icon} alt="Theme" onClick={toggleDarkMode} />
            </div>

            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Greetings, my dear</span></p>
                            <p>How can I serve you?</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => setInput("Can you suggest some beautiful places to see around the world?")}>
                                <p>Suggest beautiful places to see</p>
                                <img src={assets.compass_icon} alt="Compass" />
                            </div>
                            <div className="card" onClick={() => setInput("Can you briefly summarize the concept of Gothic architecture?")}>
                                <p>Briefly summarise this concept: gothic architecture</p>
                                <img src={assets.bulb_icon} alt="Compass" />
                            </div>
                            <div className="card" onClick={() => setInput("Can you brainstorm some team bonding activities for our work retreat?")}>
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="Compass" />
                            </div>
                            <div className="card" onClick={() => setInput("Can you improve the readability of the following code?")}>
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="Compass" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        {allInputs.user.map((userInput, index) => (
                            <div key={index}>
                                <div className="result-title">
                                    <img src={assets.user_icon} alt="User" />
                                    <p>{allInputs.user[index]}</p>
                                </div>
                                <div className="result-data">
                                    <img src={assets.gemini_icon} alt="Bot" />
                                    {loading ? (
                                        <div className="loader">
                                            <hr />
                                            <hr />
                                            <hr />
                                        </div>
                                    ) : (
                                        <p dangerouslySetInnerHTML={{ __html: allInputs.bot[index] }}></p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <textarea
                            ref={textareaRef}
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            placeholder="Enter a prompt here"
                            className="scrollable-input"
                        />
                        <div>
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="Send" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">Hanozri can make mistakes</p>
                </div>
            </div>
        </div>
    );
};

export default Main;
