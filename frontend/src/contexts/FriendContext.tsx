import React, { createContext, useReducer, Reducer } from "react";
import { FriendActionProp, FriendContextType, FriendStateProp, FriendType, ProviderProp, Friend } from "../types";


const FriendContext = createContext<FriendContextType>(null!);


const friendReducer: Reducer<FriendStateProp, FriendActionProp> = (state, action) => {
    switch (action.type) {
        case FriendType.ADD:
            return {
                friends: [...state.friends as any, action.payload]
            }

        case FriendType.FETCH:
            return {
                friends: action.payload
            }
        
        default:
            return state;
    }
}

const initialState: FriendStateProp = {
    friends: []
}


export const FriendContextProvider: React.FC<ProviderProp> = ({ children }) => {

    const [state, dispatch] = useReducer(friendReducer, initialState);

    const { friends } = state;
    console.log(state.friends)

    return (
        <FriendContext.Provider value={{friends: (friends as Friend[]), dispatch}}>
            { children }
        </FriendContext.Provider>
    )
}


export default FriendContext;