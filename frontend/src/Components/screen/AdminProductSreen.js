import axios from 'axios';
import React, {  useContext, useReducer, useState } from 'react';
import { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link, Outlet, } from 'react-router-dom';
import LoadingBox from '../mainpage/LoadingBox';
import MessageBox from '../mainpage/MessageBox';
import { toast }  from 'react-toastify';
import Card from 'react-bootstrap/Card';
import { Store } from '../../Store';
import { getError } from '../../utils';
import Rating from '../mainpage/Rating';



export default function AdminProductSreen  ( ) {


const reducer = (state, action) => {
  switch(action.type) {
      case 'FETCH_REQUEST':
          return {...state, loading: true}
          case 'FETCH_SUCCESS':
      return {...state, products: action.payload, loading: false};
      case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload};
      case 'DELETE_REQUEST':
        return { ...state, loadingDelete: true, successDelete: false };
      case 'DELETE_SUCCESS':
        return {
          ...state,
          loadingDelete: false,
          successDelete: true,
        };
      case 'DELETE_FAIL':
        return { ...state, loadingDelete: false, successDelete: false };
  
      case 'DELETE_RESET':
        return { ...state, loadingDelete: false, successDelete: false };
      default:
          return state;
  }
}

const { state } = useContext(Store);
const { userInfo } = state;

const [{loading, error, products,   loadingDelete,
  successDelete,}, dispatch] = useReducer(reducer, {
  products: [],
  loading:true, 
  error:'',

})
useEffect(() => {
  const fetchData = async () => {
      try {
          const result = await axios.get('/api/product/getProduct');
          dispatch({type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
          dispatch({type: 'FETCH_FAIL', payload: err.message });  
      }
          
  };
  if (successDelete) {
    dispatch({ type: 'DELETE_RESET' });
  } else {
    fetchData();
  }

}, [])

const deleteHandler = async (product) => {
    try {
      await axios.delete(`/api/product/${product._id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      toast.error('product deleted successfully');
      dispatch({ type: 'DELETE_SUCCESS' });
    } catch (err) {
      toast.error(getError(error));
      dispatch({
        type: 'DELETE_FAIL',
      });
    }
};


return (
  <div>
          <main>
       <h1>Products</h1>
       
            <div className='text-end'>
          <Button variant='primary' className='btnn'><Link to='/createproduct' className='text-decoration-none text-light'>Add Product</Link></Button>
        </div>
          
        <div className='products'>
        {loadingDelete && <LoadingBox></LoadingBox>}
       {
          loading ? (
           <LoadingBox />
          ) : error ? ( 
          <MessageBox variant="danger">{error}</MessageBox>
            ): (
      <Row>
          {products.map((product => (
                <div key={product._id}>
                <Card className="product" >
            <Card.Img variant="top" style={{ width: '100px', textAlign: "center", margin:'auto'}} src={product.image}></Card.Img>
            <Card.Body>
              <Card.Title>Name: {product.name}</Card.Title>
              <Rating rating={product.rating} numReviews={product.numReviews} />
              <Card.Text> Price: ${product.price}</Card.Text>
              <Card.Text>Brand: {product.brand}</Card.Text>
              <Card.Text>Quantity: {product.countInStock}</Card.Text>
              <Card.Text>Description: {product.description}</Card.Text>
              &nbsp;
              <Button 
              variant='danger' 
              onClick={() => deleteHandler(product)}
              >Delete</Button>
              
            </Card.Body>
          </Card>
                </div>
             
          )))}
          </Row >
          )}
        </div>
        
       </main>
       <Outlet />
       </div>
       
)
               
            }

