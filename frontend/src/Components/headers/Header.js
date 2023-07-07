import React, { useContext } from 'react';
import Cart from './icon/cart.png'
import  Navbar from 'react-bootstrap/Navbar'
import  Badge from 'react-bootstrap/Badge'
import  Nav from 'react-bootstrap/Nav'
import  NavDropdown from 'react-bootstrap/NavDropdown'
import { LinkContainer } from 'react-router-bootstrap';
import {Link} from 'react-router-dom'
import { Store } from "../../Store";
import './header.css'
import { toast }  from 'react-toastify';
import Container from 'react-bootstrap/Container';
import SearchBox from '../mainpage/SearchBox';
import AdministratorSreen from '../screen/AdministratorSreen';




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
       <header>
                <Navbar bg="dark" >
                <Container>

             <Link to="/">
                <Navbar.Brand id='white'>School Project</Navbar.Brand>
             </Link>
             <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox />
        <Nav className="me-auto  w-100  justify-content-end">
          <Link to="/cart" className='nav-link'>
          <img src={Cart} alt="" width="30" />
          {cart.cartItems.length > 0 && (
            <Badge pill bg="danger">
              {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            </Badge>
          )}
          </Link>
          {userInfo ? (
          <NavDropdown title={userInfo.name} className="basic-nav-dropdown" id='white'>
            <LinkContainer to="/profile">
              <NavDropdown.Item id='heade'><i className="fas fa-user"> Profile</i></NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/orderhistory">
                        <NavDropdown.Item id='heade'><i className="fas fa-history"> Order History</i></NavDropdown.Item>
                      </LinkContainer>
            <NavDropdown.Divider />
            <Link 
            className='dropdown-item'
            id='heade'

             to="#signout" onClick={signoutHandler}>
            <i className="fas fa-arrow-right"> Sign Out</i>
            </Link>
          </NavDropdown>
          ) : (
            <Link className='nav-link' to="/signin">Sign In</Link>
            )}

              {userInfo && userInfo.isAdmin && (
                
                <div>
                  <Link className='nav-link' to="/admin/dashboard" id='white'><i className="fas fa-lock"></i>  Admin</Link>
                </div>
               )}
          
        </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>

       </header>
    )
}

export default Header