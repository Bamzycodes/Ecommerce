import { Link } from "react-router-dom";
import Rating from "./Rating";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";


function Product(props) {
    const { product } = props;

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const addToCartHandler = async () => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/product/${product._id}`);

        if (data.countInStock < quantity) {
            toast.error("Sorry, product is out of stock");
            return;
        }

        ctxDispatch({
            type: "CART_ADD_ITEM",
            payload: { ...product, quantity },
        });

        console.log("Product added to cart:", { ...product, quantity }); // Log added product
        toast.success("Product Added To Cart");
    };

    return (
        
        <div className="card w-full max-w-sm rounded-lg shadow-md border border-gray-200">
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} className="w-full h-48 object-cover rounded-t-lg" alt={product.name} />
            </Link>
            <div className="p-4">
                <Link to={`/product/${product.slug}`}>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <p className="text-lg font-bold">₦{product.price}</p>
                <p className="text-sm text-gray-600">{product.description}</p>
                {product.countInStock === 0 ? (
                    <button className="w-full mt-4 py-2 bg-gray-300 text-gray-700 rounded-md" disabled>
                        Out of stock
                    </button>
                ) : (
                    <button onClick={addToCartHandler} className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        Add to cart
                    </button>
                )}
            </div>
        </div>
    );
}

export default Product;
