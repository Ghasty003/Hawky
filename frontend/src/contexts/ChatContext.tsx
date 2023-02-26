import React, { createContext, useState } from "react";
import { ProviderProp, Friend, ChatContextType } from "../types";



const ChatContext = createContext<ChatContextType>(null!);


export const ChatContextProvider: React.FC<ProviderProp> = ({ children }) => {

    const [chat, setChat] = useState<Friend>(null!);
    const [render, setRender] = useState(true);

    const chatDiv = React.useRef<HTMLDivElement>(null!);

    const showChat = () => {
        setRender(false);
    }

    const hideChat = () => {
        setRender(true);
    }

    return (
        <ChatContext.Provider value={{ chat, setChat, chatDiv, render, showChat, hideChat }}>
            { children }
        </ChatContext.Provider>
    )
}


export default ChatContext;