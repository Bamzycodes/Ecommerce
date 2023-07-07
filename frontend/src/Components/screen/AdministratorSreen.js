import { Link } from "react-router-dom"
import { NavLink, Outlet } from "react-router-dom"
import Button from 'react-bootstrap/Button';


function AdministratorSreen ( ) {

    
    return (
        <div className="dashboard">

          <div className="sidenav">

        <Button className='btnn'>
        <Link id="link"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/dashboard"
        ><i className="fas fa-ellipsis-v"> Summary</i>
          
        </Link>
        </Button>
        &nbsp;
        <Button className='btnn'>
        <Link id="link"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/products"
        >
         <i className="fas fa-shopping-cart"> Products</i>
        </Link>
        </Button>
        &nbsp;
        <Button className='btnn'>
        <Link id="link"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/orders"
        >
         <i className="fas fa-clipboard"> Orders</i>
        </Link>
        </Button>
        &nbsp;   
        <Button className='btnn'>
        <Link id="link"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/users"
        >
          <i className="fas fa-users"> Users</i>
        </Link>
        </Button>

          </div>
          <div className="content">
        <Outlet />
      </div>
          
         </div>
        )
               
            }
export default AdministratorSreen