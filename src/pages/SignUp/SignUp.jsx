import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import signupImg from '../../assets/login/login.svg'



const SignUp = () => {
    const axiosPublic = useAxiosPublic()
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if(res.data.insertedId){
                                console.log('user added to the database');
                                reset()
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "User Created Successfull",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/')
                            }
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss || SignUp</title>
            </Helmet>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                     <div className=" w-1/2 mr-20">
                        <img src={signupImg} alt="" />
                    </div>
                    <div className="card md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-500">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="PhotoURL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-500">PhotoURL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
                                {errors.email && <span className="text-red-500">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=..*[0-9])(?=.*[a-z])/
                                })} placeholder="Password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>}</div>
                            {errors.password?.type === 'minLength' && <p className="text-red-500">Password must be 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-500">Password must less than 20 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-500">Password must have one uppercase one lowercase, one number and one special characters</p>}
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value='Sign Up' />
                            </div>
                        </form>
                        <p className='text-center mb-2'><small>Already have an account Please? <Link className='text-green-500' to='/login'>Login</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;