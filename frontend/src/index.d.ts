import React from "react";

interface DivProps {
    headingText: string;
    text: string;
    img: string;
}

interface ProviderProp {
    children: React.ReactNode;
}

interface AuthReducerStateProp {
    user: object | null;
}

enum Type {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}

interface AuthActionProp {
    type: Type,
    payload: object;
}

interface AuthContextType {
    state: AuthReducerStateProp;
    dispatch: React.Dispatch<AuthActionProp>;
}