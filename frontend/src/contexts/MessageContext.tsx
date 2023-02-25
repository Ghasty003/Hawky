import React, { createContext, useEffect, useState } from "react";
import { MessagesContextType, MessagesProp, ProviderProp } from "../types";


const MessageContext = createContext<MessagesContextType>(null!);


export const MessageContextProvider: React.FC<ProviderProp> = ({ children }) => {

    const [messages, setMessages] = useState<MessagesProp[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [queryNumber, setQueryNumber] = useState<number>(0);

    return (
        <MessageContext.Provider value={{messages, setMessages, loading, setLoading, queryNumber, setQueryNumber}}>
            { children }
        </MessageContext.Provider>
    )
}


export default MessageContext;