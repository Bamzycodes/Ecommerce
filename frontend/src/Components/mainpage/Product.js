import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import Rating from './Rating';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../../Store';


function Product(props) {
    const {product } = props;

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
      cart: { cartItems },
    } = state;

    const addToCartHandler = async() => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1:1;
        const { data } = await axios.get(`/api/product/${product._id}`);
        if (data.countInStock < quantity) {
            toast.error('sorry. Product is out of stock');
            return;
        }
        ctxDispatch
        ({type:'CART_ADD_ITEM',
         payload: {...product, quantity},
        });
        toast.success('Product Added To Cart')
    }


    return (
      <Card key={product.slug} className="product">
                    <Link to={`/product/${product.slug}`} >
                    <img src= {product.image} className="card-img-top"/>{' '}
                    </Link>
                    <Card.Body>
                    <Link to={`/product/${product.slug}`} >
                    <Card.Text>{product.name} </Card.Text>
                    </Link>
                    <Rating rating={product.rating} numReviews={product.numReviews} />
                    <Card.Text>${product.price}</Card.Text>
                    <Card.Text>{product.description}</Card.Text>

                    {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)} className='btnn' variant='light'>Add to cart</Button>
        )}

                     </Card.Body>
    </Card> 
    )
}

export default Product