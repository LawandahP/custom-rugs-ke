import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, InputGroup, Row, Image, File} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { FileUploader } from '../components/FileUploader';

import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'


function ProductEditScreen({ match, history }) {

    const productId = match.params.id

    const [name, setName]                 = useState('')
    const [image, setImage]               = useState('')
    const [price, setPrice]               = useState('')
    const [category, setCategory]         = useState('')
    const [description, setDescription]   = useState('')
    const [countInStock, setCountInStock] = useState('')
    

    const [uploading, setUploading]       = useState(false)
    
    

    const [message, setMessage] = useState('') 

    const dispatch = useDispatch()

    //get state
    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        
        if(successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            
            history.push('/products')
            // setMessage("Product Updated Successfully")
            
        } else {
            if(!product.name || product.slug !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setImage(product.image)
                setPrice(product.price)
                setCategory(product.category)
                setDescription(product.description)
                setCountInStock(product.countInStock)
                // setCreatedAt(product.created_at)
                // setUpdatedAt(product.updated_at)
            }
        }

        
    }, [dispatch, product, productId, history, successUpdate])

    
    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_slug', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/image-upload', formData, config)
            setImage(data)
            setUploading(false)

        } catch(error) {
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            slug: productId,
            name,
            image,
            price,
            category,
            description,
            countInStock
        }))

    }



    return (
        <div>

            <FormContainer>
                
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {/* {successUpdate && <Message variant="success">{message}</Message>} */}

            <Row>
                <Col className="text-start">
                    <Link to='/products'>
                        <i className="fas fa-arrow-left"></i> 
                    </Link>
                </Col>
                <Col classNAme=" mb-2">
                    <h3 style={{"color": "#000"}} className="my-2">Edit Product</h3>
                </Col>
            </Row>
            
            
            
            {/* {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
            {successUpdate && <Message variant='success'>{message}</Message> }  */}

            {loading ? <Loader /> 
            : error ? <Message variant='danger'>{error}</Message>
            : (
                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col sm={12} md={6} xl={6}>
                            <Form.Group controlId='name' className="my-2">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control 
                                    type='text'
                                    placeholder='Product Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6} xl={6}>
                            <Form.Group controlId='price' className="my-2">
                                <Form.Label>Price</Form.Label>
                                <Form.Control 
                                    type='number'
                                    placeholder='Price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Image src={image} onChange={(e) => setImage(e.target.src)} />
                        
                        <Form.Control type="file" onChange={uploadFileHandler} multiple/>
                        {uploading && <Loader />}       
                    </Row>

                    <Row>
                        <Col sm={12} md={6} xl={6}>
                            <Form.Group controlId='category' className='my-2'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col sm={12} md={6} xl={6}>
                            <Form.Group controlId='countInStock' className='my-2'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Stock Count'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row>
                        <Col sm={12} md={12} xl={12}>
                            <Form.Group controlId='description' className='my-2'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={6}
                                    placeholder='Product Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                    </Row>

                    <div className="d-grid gap-2 my-2">
                        <Button type='submit' size='md'>
                        {
                            loadingUpdate ? "updating product..."
                            : "Update"
                        }
                        </Button>
                    </div>
                    

                </Form>     
            )}       
        </FormContainer>

    </div>
        
    )
}


export default ProductEditScreen

