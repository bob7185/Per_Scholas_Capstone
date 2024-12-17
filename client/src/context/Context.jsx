import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = props => {
    const [user, setUser] = useState(null);

    const updateUser = user => {
        setUser(user);
    };

    const value = {
        user, 
        updateUser,
    };
    return (
        <UserContext.Provider value={value}></UserContext.Provider>
    );
}