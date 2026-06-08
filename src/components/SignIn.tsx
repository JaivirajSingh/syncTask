import { useActionState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

const SignIn = () => {
    const { signInUser } = useAuth()
    const navigate = useNavigate()

    const [error, submitAction, isPending] = useActionState(
        async (_prevState, formData) => {
            const email = formData.get('email')
            const password = formData.get('password')

            const {
                success, data, error: signInError
            } = await signInUser(email, password)

            if (signInError) {
                return new Error(signInError)
            }

            if (success && data?.session) {
                navigate('/TodoList')
                return null
            }

            return null
        }, null
    ) 

    return (
        <>
            <h1>AUTHENTICATION</h1>
            <div>
                <form action={submitAction}>
                    <h2>Sign In</h2>
                    <p> Don't have an account yet? {' '}
                        <Link to="/SignUp"> 
                            Sign Up
                        </Link>
                    </p>
                
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" disabled={isPending} required/>

                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" disabled={isPending} required/>

                    <button type="submit">{isPending ? 'Signing In' : 'Sign In'}</button>

                    {error && (
                        <div role="alert">
                            {error.message}
                        </div>
                    )}
                </form>
            </div>
        </>
    )
}

export default SignIn