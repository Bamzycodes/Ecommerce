import { useEffect, useReducer } from 'react';
import axios from 'axios'
import Product from '../mainpage/Product'
import LoadingBox from '../mainpage/LoadingBox';
import MessageBox from '../mainpage/MessageBox';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';



const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true}
            case 'FETCH_SUCCESS':
        return {...state, products: action.payload, loading: false};
        case 'FETCH_FAIL':
        return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}

function HomeSreen() {
    const [{loading, error, products}, dispatch] = useReducer(reducer, {
        products: [],
        loading:true, 
        error:''
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
        fetchData();

    }, [])
    return (
        <div>
            <main>
             <h1>featured products</h1>
             <div className='products'>
             {
                loading ? (
                 <LoadingBox />
                ) : error ? ( 
                <MessageBox variant="danger">{error}</MessageBox>
                  ): (
            <Row>
                {products.map((product => (
                    <Col  key={product.slug} sm={6} md={4} lg={3} 
                     className="mb-3"
                    >
                   <Product product={product}></Product>
                </Col>
                )))}
                </Row >
                )}
              </div>
              
             </main>
             </div>
    )
}

export default HomeSreen