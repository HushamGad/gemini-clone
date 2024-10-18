import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext()

const ContextProvider = (props) => {

    const [input, setInput] = useState('')
    const [recentPrompt, setRecentPrompt] = useState('')
    const [prevPrompt, setPrevPrompt] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState('')

    const delayPara = (index,nextWord) =>{
        setTimeout(() => {
            setResultData(prev=>prev+nextWord)
        }, 75*index);
    }

    const newChat = () =>{
        setLoading(false)
        setShowResult(false)
    }
    const onSent = async (prompt) => {
        setResultData('')
        setLoading(true)
        setShowResult(true)
        let response
        if(prompt !== undefined){
            response = await run(prompt) 
            setRecentPrompt(prompt)
        }else{
            response = await run(input)
            setRecentPrompt(input)
            setPrevPrompt(prev=>[...prev,input])
        }
        
        
        
        let responseArray = response.split('**')
        let newResponse = ''
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i]
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>"
            }
        }
        let ontherNewResponse = newResponse.split('*').join("<br/>")
        let newResponseArray = ontherNewResponse.split(" ")
        for(let i=0; i<newResponseArray.length;i++){
            const nextWord = newResponseArray[i]
            delayPara(i,nextWord+" ")
        }
        setLoading(false)
        setInput('')

    }
    // onSent("what is react js")
    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompt,
        setPrevPrompt,
        showResult,
        loading,
        resultData,
        onSent,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider