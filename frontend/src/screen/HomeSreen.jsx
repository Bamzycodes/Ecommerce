import { useEffect, useReducer } from "react";
import axios from "axios";
import Product from "../mainpage/Product";
import LoadingBox from "../mainpage/LoadingBox";
import MessageBox from "../mainpage/MessageBox";


const reducer = (state, action) => {
    
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, products: action.payload, loading: false };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function HomeScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        products: [],
        loading: true,
        error: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get("/api/product/getProduct");
                dispatch({ type: "FETCH_SUCCESS", payload: result.data });
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: err.message });
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-4">
            <main>
                <h1 className="text-2xl font-bold mb-4">Featured Products</h1>
                <div className="flex flex-wrap justify-center gap-4">
                    {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        products.map((product) => (
                            <div key={product.slug} className="mb-3">
                                <Product product={product}></Product>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

export default HomeScreen;
