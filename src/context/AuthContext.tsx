import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabase-client";
import type { Session, User } from "@supabase/supabase-js"

type AuthContextType = {
    session: Session | null;
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
    signInUser: (email: string, password: string) => Promise<
        { success: false; error: string } |
        { success: true; data: { user: any; session: any } }
    >;
        signOutUser: () => Promise<
        { success: false; error: string } |
        { success: true }
    >;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        async function getInitialSession() {
            try {
                const { data, error } = await supabase.auth.getSession()
                
                if (error) {
                    throw error
                }

                setSession(data.session)
                
            } catch (error) {
                console.error('error getting session')
            }
        }

        getInitialSession()

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            console.log('session changed aahhhhhh', session)
        })

    }, [])

    const signInUser = async (email: string, password: string): Promise<
        { success: false; error: string } |
        { success: true; data: { user: User; session: Session } }
    > => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.toLowerCase(),
                password: password,
            })
              
            if (error) {
                    console.error('supabase sign in error', error.message)
                    return { success: false, error: error.message }
                }

            console.log('supabase sign in success', data)
            return { success: true, data }
            
            } catch (error) {
                console.error('Unexpected error during sign in', error)
                return { success: false, error: 'an unexpected error occured.' }
        }
    }

    const signOutUser = async (): Promise<
        { success: false; error: string } |
        { success: true }
    > => {
        try {
            const { error } = await supabase.auth.signOut()

            if (error) {
                console.error('supabase sign out error', error.message)
                return { success: false, error: error.message }
            }

            return { success: true }
        } catch (error) {
            console.error('Unexpected error during sign out', error)
            return { success: false, error: 'an unexpected error occured during sign out.' }
        }
    }

    return (
        <AuthContext.Provider value={{ session, setSession, signInUser, signOutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

export const useAuth = () => {
        const context = useContext(AuthContext)
        
        if (context === null) {
            throw new Error("useAuth must be used within an AuthContextProvider");
        }

        return context
}