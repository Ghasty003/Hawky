import React, { createContext, useState } from "react";
import { ProviderProp, Friend, ChatContextType } from "../types";



const ChatContext = createContext<ChatContextType>(null!);


export const ChatContextProvider: React.FC<ProviderProp> = ({ children }) => {

    const [chat, setChat] = useState<Friend>(null!);

    return (
        <ChatContext.Provider value={{ chat, setChat }}>
            { children }
        </ChatContext.Provider>
    )
}


export default ChatContext;