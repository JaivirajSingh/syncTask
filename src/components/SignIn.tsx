import { useActionState } from "react"
import { useAuth } from "../context/AuthContext"

const SignIn = () => {
    const { signInUser } = useAuth()

    const [error, submitAction, isPending] = useActionState(
        async (prevState, formData) => {
            const email = formData.get('email')
            const password = formData.get('password')

            const {
                success, data, error: signInError
            } = await signInUser(email, password)

            if (signInError) {
                return new Error(signInError)
            }

            if (success && data?.session) {
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
                    <p>Don't have an account yet? Why don't you go fuck yourself</p>
                
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="" disabled={isPending} required/>

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="" disabled={isPending} required/>

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