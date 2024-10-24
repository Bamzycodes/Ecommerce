import React, { useContext } from 'react';
import { Store } from "../Store";
import './header.css'
import toast from "react-hot-toast";
import SearchBox from '../mainpage/SearchBox';


function Header() {
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart, userInfo} = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
     localStorage.removeItem('userInfo');
     localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    toast.success('User Logged Out')
    window.location.href = '/signin';
  };
 
    return(
<header class="bg-neutral">

<div className="navbar bg-base-100">
  <div className="navbar-start">
    <a href="/" className="btn btn-ghost normal-case text-xl font-bold">STOCKS</a>
  </div>
  <div className="navbar-center">
    <div className="form-control">
      <SearchBox />
    </div>

    <a href="/cart" className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {cart.cartItems.length > 0 && (
          <span className="badge badge-xs badge-error indicator-item">
            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
          </span>
        )}
      </div>
    </a>

    </div>
        
    <div className="navbar-end">
    {userInfo ? (

        <div className="dropdown dropdown-end navbar-end">
        <label tabIndex={0} className="btn btn-ghost">{userInfo.name}</label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><a href="/profile">User Profile</a></li>
          <li><a href="/orderhistory">Order History</a></li>
          <li><a href="#signout" onClick={signoutHandler}>
            Sign Out <i className="fas fa-sign-out"></i>
          </a></li>
        </ul>
        </div>

    ) : (
      <a href="/signin" className="btn btn-ghost">Sign In</a>
    )}

    {userInfo && userInfo.isAdmin && (
      <a href="/admin/dashboard" className="btn btn-ghost">
        <i className="fas fa-lock"></i>Admin
      </a>
    )}
          </div>
</div>

</header>
    )
}


export default Header