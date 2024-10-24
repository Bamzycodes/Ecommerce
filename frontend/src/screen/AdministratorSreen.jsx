import { Link, Outlet } from 'react-router-dom';

function AdministratorScreen() {
  return (
    
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="py-4 px-3">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>
          <ul className="space-y-2">
            <li>
            <Link 
  to="/admin/stats" 
  className="flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  aria-label="Admin Statistics"
>
  <svg 
    className="w-5 h-5 mr-2" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M3 16l4-4 3 3 5-5 4 4M21 12V8a2 2 0 00-2-2h-4m0 0a2 2 0 00-2 2v4m0 0l4-4m-4 4l-4 4" 
    />
  </svg>
  Dashboard
</Link>

            </li>
            <li>
            <Link 
  to="/admin/products" 
  className="flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  aria-label="Admin Products"
>
  <i className="fas fa-shopping-cart mr-2"></i> 
  Products
</Link>

            </li>
            <li>
            <Link 
  to="/admin/orders" 
  className="flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  aria-label="Admin Orders"
>
  <i className="fas fa-clipboard mr-2"></i>
</Link>

            </li>
            <li>
            <Link 
  to="/admin/users" 
  className="flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  aria-label="Admin Users"
>
  <i className="fas fa-users mr-2"></i>
  Users
</Link>

            </li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default AdministratorScreen;
