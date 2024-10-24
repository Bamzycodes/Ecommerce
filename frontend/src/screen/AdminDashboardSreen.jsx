import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from '../mainpage/LoadingBox';
import MessageBox from '../mainpage/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


export default function AdminDashboardScreen() {
  
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/order/summary', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="mb-6">
            <strong className="text-xl font-semibold">Overview</strong>
            <p className="text-gray-500">How your shop is performing</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <h2 className="card-title text-2xl font-semibold">
                  <i className="fas fa-users mr-2"></i>
                  {summary.users ? summary.users.length : 0}
                </h2>
                <p className="text-gray-600">Users</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <h2 className="card-title text-2xl font-semibold">
                  <i className="fas fa-clipboard mr-2"></i>
                  {summary.orders ? summary.orders.length : 0}
                </h2>
                <p className="text-gray-600">Orders</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <h2 className="card-title text-2xl font-semibold">
                  <i className="fas fa-shopping-cart mr-2"></i>
                  {summary.products ? summary.products.length : 0}
                </h2>
                <p className="text-gray-600">Products</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
