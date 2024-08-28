import { createContext, useState, useEffect } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [resultData, setResultData] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [allInputs, setAllInputs] = useState({ user: [], bot: [] });
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem('userData10');
        if (storedData) {
            setUserData(JSON.parse(storedData));
            console.log(userData);
        }
    }, []);
    
    const save = () => {
        localStorage.setItem('userData10', JSON.stringify(userData));
    };

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        if (allInputs.user.length > 0 || allInputs.bot.length > 0) {
            setUserData(prev => [...prev, allInputs]);
            save()
        }
        setLoading(false);
        setShowResult(false);
        setAllInputs({ user: [], bot: [] });
    };    

    const onSent = async (prompt) => {
        setLoading(true);
        setShowResult(true);
        console.log(allInputs); 
        let response;

        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentPrompt(prompt);
            setAllInputs(prev => ({ ...prev, user: [...prev.user, prompt] }));
        } else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await runChat(input);
            setAllInputs(prev => ({ ...prev, user: [...prev.user, input] }));
        }

        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setAllInputs(prev => ({ ...prev, bot: [...prev.bot, newResponse2] }));
        setLoading(false);
        setInput("");
        console.log(userData)
    };

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        setLoading,
        setShowResult,
        newChat,
        darkMode,
        toggleDarkMode,
        allInputs,
        setAllInputs,
        userData,
        setUserData,
        save
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
