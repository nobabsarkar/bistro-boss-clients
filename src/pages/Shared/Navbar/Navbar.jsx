import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart } from 'react-icons/fa';
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [cart] = useCart()
    const [isAdmin] = useAdmin()

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.log(error);
            })
    }

    const navOptions = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/menu'>Our Menu</NavLink></li>
        <li><NavLink to='/order/salad'>Order Food</NavLink></li>
        {
            user && isAdmin && <li><Link to='/dashboard/adminHome'>Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to='/dashboard/userHome'>Dashboard</Link></li>
        }
        <li>
            <NavLink to='/dashboard/cart'>
                <button className="btn btn-sm">
                    <FaShoppingCart></FaShoppingCart>
                    <div className="badge badge-secondary">+{cart.length}</div>
                </button>
            </NavLink>
        </li>

        {
            user ? <>
                {/* <h2>{user?.displayName}</h2> */}
                <li><Link><button onClick={handleLogOut}>Log Out</button></Link></li>
            </>
                :
                <>
                    <li><NavLink to='/login'>Login</NavLink></li>
                </>
        }
    </>

    return (
        <div className="navbar bg-base-100 fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-xl mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                        {navOptions}
                    </ul>
                </div>
                <Link to='/' className='uppercase'>
                    <p className='lg:text-2xl font-bold'>Bistro Boss</p>
                    <p className='lg:font-bold'>restarunt</p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 flex items-center">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end flex items-center space-x-2">
                {

                    user ? <>
                        <h2>{user?.displayName}</h2>
                        <img style={{ width: '60px', height: '60px', borderRadius: '100%' }} src={user?.photoURL} alt="" />
                    </>

                        :
                        <FaUserCircle size={50} />
                }
            </div>
        </div>
    );
};

export default Navbar;