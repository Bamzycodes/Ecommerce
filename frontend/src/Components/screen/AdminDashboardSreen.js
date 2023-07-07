import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Store } from '../../Store';
import { getError } from '../../utils';
import LoadingBox from '../mainpage/LoadingBox';
import MessageBox from '../mainpage/MessageBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

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
    <div >
      <h1>Dashboard</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
        
          <div >
          <strong>Overview</strong>
          <p>How your shop is performing</p>
          </div>
          <Row>
            <Col md={3}>
              <Card id='table'>
                <Card.Body>
                  <Card.Title>
                  <i className="fas fa-users"></i>
                    {summary.users
                      ? summary.users.length
                      : 0}
                  </Card.Title>
                  <Card.Text> Users</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card id='table'>
                <Card.Body>
                  <Card.Title>
                  <i className="fas fa-clipboard"></i>
                    {summary.orders
                      ? summary.orders.length
                      : 0}
                  </Card.Title>
                  <Card.Text> Orders</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card id='table'>
                <Card.Body>
                  <Card.Title>
                  <i className="fas fa-shopping-cart"></i> 
                    {summary.products
                      ? summary.products.length
                      : 0}
                  </Card.Title>
                  <Card.Text> Products </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
        </>
      )}
    </div>
  );
}

