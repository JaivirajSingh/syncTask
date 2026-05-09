import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <>
            <div>
                <form>
                    <h1>AUTHENTICATION</h1>
                    <h2>Sign up Now</h2>
                    <p>
                        Already have an account?{' '}
                        <Link to={"/"}>
                            Why don't you fuck yourself
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
                        Sign Up
                        {/*'Signing up...' when pending*/}
                    </button>

                    {/* Error message */}
                </form>
            </div>
        </>
    );
};

export default SignUp;
