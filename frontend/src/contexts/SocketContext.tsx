import React, { createContext, useEffect, useRef, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { ProviderProp } from "../types";
import AuthContext from "./AuthContext";

interface test {
    test: string
}

const SocketContext = createContext<test>(null!);


export const SocketContextProvider: React.FC<ProviderProp> = ({ children }) => {

    const socket = useRef<Socket>(null!);

    const { state } = useContext(AuthContext);

    const test = "Hello world";
    console.log(test);

    useEffect(() => {
        socket.current = io("http://localhost:3000");
    }, [state.user]);

    return (
        <SocketContext.Provider value={{test}}>
            { children }
        </SocketContext.Provider>
    )
}


export default SocketContext;