import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart()
    
    // TODO: get isAdmin value from the database
    // const isAdmin = true  // example first
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            {/* dashboard side bar  */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-5 fixed">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to='/dashboard/adminHome'><FaHome></FaHome>Admin Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/addItems'><FaUtensils></FaUtensils> Ad Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manageItems'><FaList></FaList> Manage Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manageBooking'><FaBook></FaBook> Manage Bookings</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/allUsers'><FaUsers></FaUsers> All Users</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to='/dashboard/userHome'><FaHome></FaHome>User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/review'><FaAd></FaAd>Add a Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/cart'><FaShoppingCart></FaShoppingCart>My Cart ({cart.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/bookings'><FaCalendar></FaCalendar>My Bookings</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/paymentHistory'><FaList></FaList>Payment History</NavLink>
                                </li>
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'><FaHome></FaHome>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/salad'><FaSearch></FaSearch> Manu</NavLink>
                        <NavLink to='/contact'><FaEnvelope></FaEnvelope> Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;