import axios from 'axios';
import { useState, useContext } from 'react';
import { Store } from '../Store';
import { getError } from '../utils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function AdminProductCreate() {
  
  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [numReviews, setNumRevies] = useState("");
  const [res, setRes] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
  
    // Validation for rating
    if (isNaN(rating) || rating > 5) {
      toast.error("Rating must be a number and less than or equal to 5");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('my_file', file);
      formData.append('name', name);
      formData.append('slug', slug);
      formData.append('brand', brand);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('countInStock', countInStock);
      formData.append('rating', rating);
      formData.append('numReviews', numReviews);
  
      const res = await axios.post(
        '/api/product/images', 
        formData, 
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`
          }
        }
      );
      
      setRes(res.data);
      toast.success('Product created successfully');
      navigate("/admin/products");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4">Create Product</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          
          {/* File Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          {/* Product Name */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Slug */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Slug"
              className="input input-bordered w-full"
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          {/* Brand */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Brand"
              className="input input-bordered w-full"
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Price"
              className="input input-bordered w-full"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Count In Stock */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Count in stock"
              className="input input-bordered w-full"
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Short Description"
              className="input input-bordered w-full"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Rating */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Rating"
              className="input input-bordered w-full"
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>

          {/* Number of Reviews */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Number of Reviews"
              className="input input-bordered w-full"
              onChange={(e) => setNumRevies(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="btn btn-primary w-full">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProductCreate;

