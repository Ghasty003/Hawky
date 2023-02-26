import React, { createContext, useState } from "react";
import { ProviderProp, Friend, ChatContextType } from "../types";



const ChatContext = createContext<ChatContextType>(null!);


export const ChatContextProvider: React.FC<ProviderProp> = ({ children }) => {

    const [chat, setChat] = useState<Friend>(null!);

    const chatDiv = React.useRef<HTMLDivElement>(null!);

    const showChat = () => {
        return console.log("show chat");
    }

    return (
        <ChatContext.Provider value={{ chat, setChat, chatDiv, showChat }}>
            { children }
        </ChatContext.Provider>
    )
}


export default ChatContext;