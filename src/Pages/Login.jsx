import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Login = () => {

    const { signInUser, googleSignIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(() => {
                toast('Login Successfully')
                navigate(location?.state || "/")
            })

    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(() => {

                toast('Login Successfully')
                navigate(location?.state || "/")
            })
    }


    return (
        <div className="mb-5 pt-20  lg:pt-12">
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col md:flex-row lg:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Welcome back! Please log in to access your account and shop our latest products.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#B43F3F] text-white">Login</button>
                            </div>
                        </form>
                        <div className="divider">OR</div>
                        <button onClick={handleGoogleLogin} className="border-2 w-3/4 md:w-3/4 lg:w-3/4 mx-auto rounded-lg p-2 mb-3">
                            <div className="flex gap-3 items-center justify-center ">
                                <FcGoogle className="text-2xl"></FcGoogle>
                                <h5 className="text-lg">Continue with Google</h5>
                            </div>
                        </button>
                        <div className="flex items-center justify-center pb-4">
                            <p>Do not have an account? Please<Link to='/register' className="text-[#1507e2] font-medium"> Register</Link></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;