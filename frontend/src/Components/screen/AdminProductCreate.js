import axios from 'axios';
import  {useState } from 'react'
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Store } from '../../Store';
import { getError } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { toast }  from 'react-toastify';




function AdminProductCreate  ( ) {

  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [file, setFile] = useState(null)
  const [name, setName] = useState("")
  // const [preview, setPreview] = useState()
  const [slug, setSlug] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [numReviews, setNumRevies] = useState("");
  const [res, setRes] = useState({})

  console.log(file)

  const submitHandler = async (e) =>{
    e.preventDefault()
          try {
            const formData = new FormData();
            formData.append('my_file', file)
            formData.append('name', name)
            formData.append('slug', slug)
            formData.append('brand', brand)
            formData.append('price', price)
            formData.append('description', description)
            formData.append('countInStock', countInStock)
            formData.append('rating', rating)
            formData.append('numReviews', numReviews)
            const res = await axios.post( 
              '/api/product/images', formData, {
                headers: { 
                "Content-Type":"multipart/form-data",
                Authorization: `Bearer ${userInfo.token}` 
              },
            })
            setRes(res.data)
            toast.success('product created successfully');
            navigate("/admin/products")
          } catch (err) {
           toast.error(getError(err));
            }

}


    
    return (
        <div>
     <Container className="small-container" id='table'>
          <h1>Products</h1>
          
          <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
          <Form.Label>IMAGE</Form.Label>
          <Form.Control
          className='mb'
            type="file" 
            name='name'
            onChange={(e) => setFile(e.target.files[0])} required
            multiple={false} 
      />
      </Form.Group>
      <Form.Group className="mb-3">
            <Form.Control
         type="name" required 
        onChange={(e) => setName(e.target.value)} placeholder="Name" 
        />
        </Form.Group> 

         <Form.Group className="mb-3">
            <Form.Control
         type="text" required 
        onChange={(e) => setSlug(e.target.value)} placeholder="Slug" 
        />
        </Form.Group>
 
        <Form.Group className="mb-3">
            <Form.Control
        onChange={(e) => setBrand(e.target.value)} placeholder="Brand"
        >

      </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control
         type="text" required 
         onChange={(e) => setPrice(e.target.value)} placeholder="Price"
        />
        </Form.Group>


             <Form.Group className="mb-3">
            <Form.Control
        onChange={(e) => setCountInStock(e.target.value)} placeholder="Count in stock"
        >
      </Form.Control>
        </Form.Group>



         <Form.Group className="mb-3">
            <Form.Control
         type="text" required
        onChange={(e) => setDescription(e.target.value)} placeholder="Short Description"  
        />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control
         required
        onChange={(e) => setRating(e.target.value)} placeholder="rating"  
        />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control
         required
        onChange={(e) => setNumRevies(e.target.value)} placeholder="number of reviews"  
        />
        </Form.Group>

      <div>
            <Button type="submit">
             Upload
            </Button>
          </div> 
        </Form>
        
      </Container>
        
                  </div>
        )
               
            }
export default AdminProductCreate