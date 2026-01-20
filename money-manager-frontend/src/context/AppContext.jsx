import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {

    const [user, setuser] = useState(null);

    const clearUserData =()=>{
        setuser(null);
    }



    const contextValue = {
        user,
        setuser,
        clearUserData
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setuser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}
