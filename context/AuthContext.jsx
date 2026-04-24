import { createContext, useState } from "react";

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined)

    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider