import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from '../mainpage/LoadingBox';
import MessageBox from '../mainpage/MessageBox';

const reducer = (state, action) => {
  
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};


export default function AdminProductScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, products, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      products: [],
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const result = await axios.get('/api/product/getProduct');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  const deleteHandler = async (product) => {
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/product/${product._id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      toast.success('Product deleted successfully');
      dispatch({ type: 'DELETE_SUCCESS' });
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'DELETE_FAIL' });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="text-end mb-4">
        <Link to="/createproduct" className="btn btn-primary">
          Add Product
        </Link>
      </div>
      {loadingDelete && <LoadingBox />}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img src={product.image} alt={product.name} className="w-20 h-20 object-cover" />
                  </td>
                  <td>{product.name}</td>
                  <td>₦{product.price.toFixed(2)}</td>
                  <td>{product.brand}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.description}</td>
                  <td>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Outlet />
    </div>
  );
}

