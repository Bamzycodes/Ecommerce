
import { Link } from 'react-router-dom';


function Sidebar ( ) {




    
    return (
        <div className='sidebar'>
          <ul>
            <li>
             <Link to="/admin/dashboard">
                   <i className="fas fa-ellipsis-v">Dashboard</i>
                </Link>
              </li>
            <li><i className="fas fa-shopping-cart">Products</i></li>
            <li></li>
            <li></li>
          </ul>
         </div>
        )
               
            }
export default Sidebar