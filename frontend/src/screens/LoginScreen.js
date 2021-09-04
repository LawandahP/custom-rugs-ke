import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, InputGroup} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { login } from '../actions/userActions'

function LoginScreen({location, history}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    //redirect to page of choice if user is logged in
    const redirect = location.search ? location.search.split('='[1]) : '/shop'

    //get state
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    //show or hide password
    const [isReaveled, setIsRevealed] = useState(false)

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    return (
        <FormContainer>
            <h3 className="my-3" style={{color: "#000"}}>SIGN IN</h3>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

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
                <div className="d-grid gap-2 my-2" align="center">
                    <Button type='submit' align="center" className='d-grid gap-2 my-3'>
                        Sign In
                    </Button>
                </div>

            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? 
                    <Link 
                        to={redirect ? `/register?redirect=${redirect}`
                        : '/register'}> Register 
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
