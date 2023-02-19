import React, { createContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { ProviderProp } from "../types";

interface test {
    test: string
}

const SocketContext = createContext<test>(null!);


const SocketContextProvider: React.FC<ProviderProp> = ({ children }) => {

    const socket = useRef<Socket>(null!);

    const test = "Hello world";

    useEffect(() => {
        socket.current = io("http://localhost:3000");
    }, []);

    return (
        <SocketContext.Provider value={{test}}>
            { children }
        </SocketContext.Provider>
    )
}


export default SocketContext;