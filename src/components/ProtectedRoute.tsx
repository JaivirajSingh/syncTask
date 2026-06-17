import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }: { children?: React.ReactNode}) => {
    const { session } = useAuth()

    if (session === undefined) return <div>Loading...</div>

    // Doesn't let user go to dashboard without signing in
    return session ? <>{children}</> : <Navigate to="/SignIn"/>
}

export default ProtectedRoute