import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, InputGroup, Image } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { register } from '../actions/userActions'

function RegisterScreen({ location, history }) {

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const [isReaveled, setIsRevealed] = useState(false)

    const dispatch = useDispatch()

    //redirect to page of choice if user is logged in
    const redirect = location.search ? location.search.split('='[1]) : '/shop'

    //get state
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(first_name, last_name, email, phone_number, password))
    }



    return (
        <FormContainer>
            <h3>Create Account</h3>
            {/* {message && <} */}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
                <Row>
                    <Col sm={12} md={6} xl={6}>
                        <Form.Group controlId='first_name' className="my-2">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                required
                                type='text'
                                placeholder='Enter First Name'
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={6} xl={6}>
                        <Form.Group controlId='last_name' className="my-2">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                required
                                type='text'
                                placeholder='Enter Last Name'
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group controlId='email' className='my-2'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            required
                            type='email'
                            placeholder='Enter Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row>
                    <Col sm={12} md={6} xl={6}>
                        <Form.Group controlId='phone_number' className='my-2'>
                            <Form.Label>Phone Number</Form.Label>
                            <InputGroup>
                                <InputGroup.Text id="inputGroupPrepend">+254</InputGroup.Text>
                            
                                <Form.Control 
                                    type="number"
                                    maxLength="9"
                                    aria-describedby="inputGroupPrepend"
                                    placeholder='Phone Number(Optional)'
                                    value={phone_number}
                                    onChange={(e) => setPhoneNumber(e.target.value)}>
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>
                    </Col>

                    <Col sm={12} md={6} xl={6}>
                        <Form.Group controlId='password' className='my-2'>
                            
                            <Form.Label>Password</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control 
                                        required
                                        type={isReaveled ? "text" : "password"}
                                        placeholder='Enter Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}>
                                        
                                    </Form.Control>
                                <InputGroup.Text id="hide-show-pwd" 
                                    title={isReaveled ? "Hide password" : "Show Password"}
                                    onClick={() => setIsRevealed(prevState => !prevState)}>
                                    {isReaveled ? 
                                        <i className='fas fa-eye-slash'></i> : <i className='fas fa-eye'></i>}
                                </InputGroup.Text>

                            </InputGroup>                          
                        </Form.Group>
                    </Col>
                </Row>
                
                
                                
                               

                         
                
                <div className="d-grid gap-2 my-2">
                    <Button type='submit' size='md'>
                        Sign In
                    </Button>
                </div>
                

            </Form>            
        </FormContainer>
    )
}

export default RegisterScreen
