import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import loginImg from '../../assets/login/login.svg'

const Login = () => {
    const { signIn } = useContext(AuthContext)
    const [disabled, setDisabled] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const from = location.state?.from?.pathname || '/'

    const handleLogin = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Login Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss || Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className=" w-1/2 mr-20">
                        <img src={loginImg} alt="" />
                    </div>
                    <div className="card md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="Password" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder="Type the captcha above" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} className="btn btn-primary" type="submit" value='Login' />
                            </div>
                            <SocialLogin></SocialLogin>
                        </form>
                        <p className='text-center mb-2'><small>New Here ? <Link className='text-green-500' to='/signUp'>Create an Account</Link></small></p>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Login;