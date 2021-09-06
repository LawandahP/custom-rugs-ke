import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

import { Form, Button, Row, Col, InputGroup, Container, Tab, Tabs, Table, Card, Image, Badge } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

import { listMyOrders } from '../actions/orderActions'
import { commafy } from '../constants/cartConstants'



function ProfileScreen({ match, history }) {

    
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [comfirmPassword, setComfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const [isReaveled, setIsRevealed] = useState(false)

    const dispatch = useDispatch()

    //get state
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    //make sure user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    //refresh state
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    //get orders
    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user || success || userInfo.slug !== user.slug ) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails(userInfo.slug))
                dispatch(listMyOrders())

            } else {
                setFirstName(user.first_name)
                setLastName(user.last_name)
                setEmail(user.email)
                setPhoneNumber(user.phone_number)
                
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password != comfirmPassword) {
            setMessage('Passwords do not match')

        } else {
            dispatch(updateUserProfile( {
                'id': user.id,
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'phone_number': phone_number,
                'password': password

            }))
            setMessage('')
        }
        
    }



    return (
        <Container>
            <Row className='justify-content-md-center my-4'>
                <Col xs={12} md={8}>

                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}

                    <Tabs defaultActiveKey="/profile">
                        <Tab eventKey='/profile' title="Update Profile">
                            <Form onSubmit={submitHandler} className="my-4">
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
                                    <Col sm={12} md={6} xl={6}>
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
                                    </Col>
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
                                </Row>

                                <Row>
                                    <Col sm={12} md={6} xl={6}>
                                        <Form.Group controlId='password' className='my-2'>
                                            
                                            <Form.Label>Password</Form.Label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control 
                                                        
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


                                    <Col sm={12} md={6} xl={6}>
                                        <Form.Group controlId='comfirmPassword' className='my-2'>
                                            
                                            <Form.Label>Comfirm Password</Form.Label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control 
                                                        
                                                        type={isReaveled ? "text" : "password"}
                                                        placeholder='Comfirm Password'
                                                        value={comfirmPassword}
                                                        onChange={(e) => setComfirmPassword(e.target.value)}>
                                                        
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
                                    <Button type='submit' variant='primary'>
                                        Update
                                    </Button>
                                </div>
                                

                            </Form>            
                        </Tab>
                        
                        
                        <Tab eventKey='my-orders' title="My Orders">
                            
                            {loadingOrders ? (
                                <Loader />
                            ) : errorOrders ? (
                                <Message variant="danger">{errorOrders}</Message>
                            ): (
                                
                                
                                <div className="my-4">
                                    
                                    <Table striped responsive className="table-sm">
                                    {!orders ? <i style={{color: "orange"}} className="fas fa-microscope"></i>
                                        :
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>T.Price</th>
                                                
                                                <th>Payment method</th>
                                                <th>Paid</th>
                                                <th>Delivered</th>
                                            </tr>
                                            
                                        </thead>
                                    }
                                        {orders.map(order => 
                                            <tr key={order.slug}>
                                                <td>{order.created_at.substring(0, 10)}</td>
                                                <td>{commafy(order.totalPrice)}</td>
                                                
                                                

                                                <td> {order.paymentMethod === "Paypal" 
                                                    ? <Image src="https://learning-tribes.com/wp-content/uploads/2021/01/paypal-logo-png-transparent-1024x333.png" style={{width: 70, height: 'auto'}} />
                                                    : <Image src="https://www.gtbank.co.ke/uploads/transforms/general/47459/mpesa_af599ee76a60a3ffac0b778428c6ae2f.png" style={{width: 50, height: 'auto'}} />
                                                    }
                                                </td>

                                                <td> {order.isPaid 
                                                    ? <i class="fas fa-check" style={{color: "rgb(67, 211, 0)"}}></i>
                                                    : <i class="fas fa-times-circle" style={{color: "rgb(255, 0, 0)"}}></i>
                                                    }
                                                </td>

                                                <td>{order.isDelivered 
                                                    ? <i class="fas fa-check" style={{color: "rgb(67, 211, 0)"}}></i> 
                                                    : <i class="fas fa-times-circle" style={{color: "rgb(255, 0, 0)"}}></i>
                                                }
                                                </td>
                                                <td>
                                                    <Link to={`order-details/${order.slug}`}>
                                                    <Button variant="primary" 
                                                        className="btn-sm"
                                                        title="See order details">
                                                        See Details 
                                                    </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )}
                                    </Table>        
                                </div>
                                
                            )}
                        </Tab>

                    </Tabs>                    
                </Col>
            </Row>
        </Container>


        
    )
}

export default ProfileScreen




                                        



                                                // <tr key={order.slug}>
                                                //     <td>{order._id.substring(0, 8)}...</td>
                                                //     <td>{commafy(order.totalPrice)}</td>
                                                //     <td>{order.created_at.substring(0, 10)}</td>
                                                
                                                //     <td>{order.isPaid ? 

                                                //         <p style={{color: "green"}}>{order.paidAt.substring(0, 10)}</p> : (
                                                //         <i style={{color: "red"}}>Not Paid</i>
                                                //     )}
                                                //     </td>

                                                //     <td>{order.isDelivered ? 
                                                //         <p style={{color: "green"}}>Delivered</p> : (
                                                //         <i style={{color: "red"}}>Not Delivered</i>
                                                //     )}
                                                //     </td>
                                                //     <td>
                                                //         <LinkContainer to={`orders/${order.slug}`}>
                                                //             <Button className="btn-sm">Details</Button>
                                                //         </LinkContainer>
                                                //     </td>
                                                // </tr>
