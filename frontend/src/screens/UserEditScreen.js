import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, InputGroup, Row} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'



function UserEditScreen({ match, history }) {

    const userId = match.params.id

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const [message, setMessage] = useState('') 

    const dispatch = useDispatch()

    //get state
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {

        if(successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            // history.push('/users')
            setMessage('User Updated Successfully')
        } else {
            if(user.slug !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setFirstName(user.first_name)
                setLastName(user.last_name)
                setEmail(user.email)
                setPhoneNumber(user.phone_number)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, userId, successUpdate, history ])

        

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({
            slug: user.slug,
            first_name,
            last_name,
            email,
            phone_number,
            isAdmin
        }))

    }



    return (

        <div>
            <Link to='/users'>
            <i class="fas fa-arrow-left"></i> see all users
            </Link>

            <FormContainer>
            <h3 style={{"color": "#000", "textAlign": "center"}} className="mb-2">Edit User</h3>
            
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
            {successUpdate && <Message variant='success'>{message}</Message> } 

            {loading ? <Loader /> 
            : error ? <Message variant='danger'>{error}</Message>
            : (
                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col sm={12} md={6} xl={6}>
                            <Form.Group controlId='first_name' className="my-2">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
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
                                    <InputGroup.Text id="inputGroupPrepend">
                                        <i className="fas fa-phone"></i>
                                    </InputGroup.Text>
                                    <Form.Control 
                                        type="text"
                                        maxLength="13"
                                        aria-describedby="inputGroupPrepend"
                                        placeholder='Phone Number(Optional)'
                                        value={phone_number}
                                        onChange={(e) => setPhoneNumber(e.target.value)}>
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                        </Col>

                        <Col sm={12} md={6} xl={6}>
                            <Form.Group controlId='isAdmin' className='my-2'>
                                <Form.Label>Permission</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Check 
                                            type='checkbox'
                                            label='Is Admin'
                                            checked={isAdmin}
                                            onChange={(e) => setIsAdmin(e.target.checked)}>
                                            
                                        </Form.Check>
                                </InputGroup>                          
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


export default UserEditScreen

