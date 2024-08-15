import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Register = () => {

    const { signUpUser, signOutUser } = useAuth()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signUpUser(email, password)
            .then(result => {
                console.log(result.user)
                if (result.user) {

                    toast('Registration Successfully')
                    navigate('/login')
                    signOutUser()
                }
            })

    }


    return (
        <div className="mb-5 pt-20  lg:pt-12">
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col md:flex-row lg:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold">Register now!</h1>
                        <p className="py-6">
                            Welcome back! Please log in to access your account and shop our latest products.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleRegister} className="card-body">
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
                                <button className="btn bg-[#B43F3F] text-white">Register</button>
                            </div>
                        </form>
                        <div className="flex items-center justify-center pb-4">
                            <p>Do you have an account? Please<Link to='/login' className="text-[#1507e2] font-medium"> Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;