import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, InputGroup, Row, Image} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { createProduct } from '../actions/productActions'



function ProductEditScreen({ location, history }) {

    const redirect = location.search ? location.search.split('='[1]) : '/shop'
    const [message, setMessage] = useState('') 

    const [name, setName]                 = useState('')
    const [image, setImage]               = useState('')
    const [price, setPrice]               = useState('')
    const [category, setCategory]         = useState('')
    const [description, setDescription]   = useState('')
    const [countInStock, setCountInStock] = useState('')
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productCreate = useSelector(state => state.productCreate)
    const {error, loading, success} = productCreate

    const dispatch = useDispatch()

    useEffect(() => {
        if(!userInfo || userInfo.IsAdmin) {
            history.push(redirect)
        } else {
            if(success) {
                history.push('/products')
            }
        }
    }, [history, userInfo, redirect])
         

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProduct(
            name,
            image,
            price,
            category,
            description,
            countInStock
        ))

    }



    return (
        <div>
            <Link to='/products'>
            <i class="fas fa-arrow-left"></i>
            </Link>

            <FormContainer>
            <h3 style={{"color": "#000", "textAlign": "center"}} className="mb-2">Create Product</h3>
            
            

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
                        <Form.Group controlId='price' className="my-2">                        
                            <Button className="btn btn-mdb-color btn-rounded float-left">
                                <span>Choose file</span>
                                <input type="file"></input>
                            </Button>
                            
                        </Form.Group>
                        

                        
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
                            Update
                        </Button>
                    </div>
                    

                </Form>     
            )}       
        </FormContainer>

    </div>
        
    )
}


export default ProductEditScreen

