import { createContext, useReducer, Reducer } from "react";
import { AuthActionProp, AuthContextType, AuthReducerStateProp, ProviderProp, Type } from "../types";


const AuthContext = createContext<AuthContextType>(null!);


const authReducer: Reducer<AuthReducerStateProp, AuthActionProp> = (state, action) => {
    switch (action.type) {
        case Type.LOGOUT:
            return {
                user: null
            }

        case Type.LOGIN:
            return {
                user: action.payload
            }

        default:
            return state;
    }
}


const initialState: AuthReducerStateProp = {
    user: null
}


export const AuthContextProvider: React.FC<ProviderProp> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}



export default AuthContext;