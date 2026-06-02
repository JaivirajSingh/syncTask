import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Header() {
    const { signOutUser, session } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const handleSignOut = async () => {
        const result = await signOutUser()
        if (result.success) {
            navigate("/SignIn")
        } else {
            setError(error)
        }
    }

    return (
        <>
            <button onClick={handleSignOut}>
                Sign Out
            </button>

            <h2>
                {session?.user?.email}
            </h2>

            {error && (
                <div role="role">
                    {error}
                </div>
            )}
        </>
    )
}