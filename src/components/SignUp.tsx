import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useActionState } from "react";

const SignUp = () => {
    const { signUpNewUser } = useAuth()
    const navigate = useNavigate()

    const [error, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            const email = formData.get('email')
            const password = formData.get('password')

            const {
                success, data, error: signUpError
            } = await signUpNewUser(email, password)

            if (signUpError) {
                return new Error(signUpError)
            }

            if (success && data?.session) {
                navigate('/TodoList')
                return null
            }

            return null
        },
        null
    )

    return (
        <>
            <div>
                <form action={submitAction}>
                    <h1>AUTHENTICATION</h1>
                    <h2>Sign up Now</h2>
                    <p>
                        Already have an account?{' '}
                        <Link to={"/"}>
                            Sign In
                        </Link>
                    </p>

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder=""
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder=""
                        required
                    />

                    <button type="submit">
                        {isPending ? 'Signing Up. Calm Down' : 'Sign Up'}
                    </button>

                    {error && (
                        <div role="alert">
                            {error.message}
                        </div>
                    )}
                </form>
            </div>
        </>
    );
};

export default SignUp;
