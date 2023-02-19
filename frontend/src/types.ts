import React from "react";

export interface DivProps {
    headingText: string;
    text: string;
    img: string;
}

export interface ProviderProp {
    children: React.ReactNode;
}

export interface User {
    _id: string;
    displayPicture: string;
    userName: string;
    password: string;
    token: string;
    email: string;
    id: string;
}

export interface AuthReducerStateProp {
    user: User | unknown;
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