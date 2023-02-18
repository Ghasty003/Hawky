import React from "react";

export interface DivProps {
    headingText: string;
    text: string;
    img: string;
}

export interface ProviderProp {
    children: React.ReactNode;
}

export interface AuthReducerStateProp {
    user: object | null;
}

export enum Type {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}

export interface AuthActionProp {
    type: Type,
    payload: object;
}

export interface AuthContextType {
    state: AuthReducerStateProp;
    dispatch: React.Dispatch<AuthActionProp>;
}