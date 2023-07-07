import React, { useContext } from 'react';
import { Route, Routes} from 'react-router-dom'
import  Navbar from 'react-bootstrap/Navbar'
import  Badge from 'react-bootstrap/Badge'
import  Nav from 'react-bootstrap/Nav'
import  NavDropdown from 'react-bootstrap/NavDropdown'
import { LinkContainer } from 'react-router-bootstrap';
import {Link} from 'react-router-dom'
import Cart from './Components/headers/icon/cart.png'
import SearchBox from '../src/Components/mainpage/SearchBox'
// import Header from './Components/headers/Header';
import CartScreen from './Components/screen/CartSreen';
import HomeSreen from "./Components/screen/HomeSreen";
import PaymentMethodScreen from './Components/screen/PaymentMethodScreen';
import PlaceOrderScreen from './Components/screen/PlaceOrderScreen';
import ProductSreen from "./Components/screen/ProductSreen";
import ShippingAddressScreen from './Components/screen/ShippingAddressScreen';
import SigninScreen from './Components/screen/SigninScreen';
import SignupScreen from './Components/screen/SignupScreen';
import AdminProductScreen from './Components/screen/AdminProductSreen';
import AdminUserScreen from './Components/screen/AdminUserSreen';
import AdminOrderSreen from './Components/screen/AdminOrderSreen';
import UserEditScreen from './Components/screen/UserEditScreen';
import AdminDashboardScreen from './Components/screen/AdminDashboardSreen';
import AdminProductCreate from './Components/screen/AdminProductCreate';
import ProfileScreen from './Components/screen/ProfileScreen';
import { ToastContainer, toast }  from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import OrderScreen from './Components/screen/OrderScreen';
import OrderHistoryScreen from './Components/screen/OrderHistoryScreen';
import SearchScreen from './Components/screen/SearchScreen';
import AdministratorSreen from './Components/screen/AdministratorSreen';
import { Store } from './Store';
import Container from 'react-bootstrap/esm/Container';

function App() {
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
    return (
      <>
      <div className='site-container'>
      <ToastContainer position="bottom-right" limit={1} /> 
     
      <Navbar bg="dark" variant="dark" expand="lg">
          <Container>

             <LinkContainer to="/">
                <Navbar.Brand id='white'>Project</Navbar.Brand>
             </LinkContainer>
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

      <main>
        <div className='mt-3'>
        <Routes>
        <Route path="/product/:slug" element={<ProductSreen />} />
        <Route path="/cart" element={<CartScreen />}  />
        <Route path="/" element={<HomeSreen />}  />
        <Route path="/profile" element={<ProfileScreen />}></Route>
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/admin" element={<AdministratorSreen />}>
        <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
        <Route path="/admin/products" element={<AdminProductScreen />} />
        <Route path="/admin/orders" element={<AdminOrderSreen />} />
        <Route path="/admin/users" element={<AdminUserScreen />}>
        </Route>
        </Route>
        <Route path="/signin"  element={<SigninScreen />} />
        <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
        <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
        <Route path="/payment" element={<PaymentMethodScreen />}></Route>
        <Route path="/signup" element={<SignupScreen />} />
      
      
        <Route path="/createproduct" element={<AdminProductCreate />} />
        
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/orderhistory" element={<OrderHistoryScreen />} />

        <Route
                path="/admin/user/:id"
                element={
                    <UserEditScreen />
                }
              ></Route>
          </Routes>
          </div>
          </main>
          <footer>
            <div className='text-center'>All rights reserved</div>
          </footer>
          </div>
         
          </>
    )

  }

export default App
