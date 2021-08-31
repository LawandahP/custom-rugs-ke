import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Message } from '../components/Message'
import EmptyCart from '../components/EmptyCart'

import { addToCart, removeFromCart } from '../actions/cartActions'

// adds commas to price
import { commafy } from '../constants/cartConstants'


function CartScreen({ match, location, history }) {
    const productId = match.params.id
    const Qty = location.search ? Number(location.search.split('=')[1]) : 1 //split to get number ordered
    
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log('cartItems', cartItems)
   
    useEffect(() => {
        
        if(productId) {
            dispatch(addToCart(productId, Qty))
        }
        
        
    }, [dispatch, productId, Qty, userInfo, history]) //add to local storage using dispatch

    //removes product from cart -- Check in cartReducer
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        if(!userInfo) {
            history.push('/login?redirect=shop/shipping')
        } else {
            history.push('/shipping')
        }
    }

    return (
        <div>
            {cartItems.length === 0 ? (
                    
                    <EmptyCart/ > 
                    
                ) : (
                    <div>
                        <Row>
                            <Col className="my-2">
                                <h3 style={{color: '#f16100', padding: 3}}>Cart({cartItems.reduce((acc, item) => acc + item.Qty, 0)}) items</h3>
                            </Col>
                            
                        </Row>
                        {/* <Row>
                            <Col xs={2} xl={2}>
                                <p className='text-muted'>Product</p>
                            </Col>
                            <Col xs={2} xl={3}>
                                <p className='text-muted'></p>
                            </Col>

                            <Col xs='auto' xl={2} className='my-1'>
                                <p className='text-muted'>Qty</p>
                            </Col>

                            <Col xs={3} xl={2}>
                                <p className='text-muted'>Total</p>
                            </Col>
                            <hr></hr>

                        </Row> */}
                        <Row>
                            <Col>
                                <ListGroup variant="flush">
                                    {cartItems.map(item => (
                                        <ListGroup.Item style={{backgroundColor: "#f0f0f0"}} key={item.product}>
                                            <Row>
                                                <Col xs={3} xl={3}>
                                                    <Link to={`/product/${item.product}`}><Image src={item.image} alt={item.name} fluid/></Link>
                                                </Col>

                                                <Col xs={4} xl={3} className="text-start">
                                                    <ul>
                                                        <li>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </li>
                                                        <li>
                                                        KES {commafy(item.price)}
                                                        </li>
                                                    
                                                    </ul>
                                                    
                                                </Col>

                                               

                                                <Col  md="auto" xs="auto" xl={3} className='my-1'>
                                                    <Form.Control as="select"
                                                        title="How many do you prefer?" 
                                                        value={item.Qty}
                                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                            {  
                                                            // create quantity off of countInStock
                                                            [...Array(item.countInStock).keys()].map((x) => (
                                                                <option key={x +1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                            }
                                                    </Form.Control>
                                                </Col>

                                                <Col xs={1} xl={3} className="my-3">
                                                    
                                                    <i className="fas fa-trash-alt"
                                                        title="remove item from cart"
                                                        style={{color: '#FF0000'}}
                                                        type="button"
                                                        variant="danger"
                                                        onClick={() => removeFromCartHandler(item.product)}>
                                                    </i>
                                                    
                                                </Col>
                                                
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>          
                        

                        
                            
                            <Col md={6} xl={4} className="my-2">
                                <Card>
                                    <ListGroup variant='flush'>
                                
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                SubTotal:
                                                </Col>
                                                <Col>
                                                    {/* Adds quantity of each products and add them together with other products  */}
                                                    KES {commafy(cartItems.reduce((acc, item) => acc + item.Qty * item.price, 0).toFixed(2))} {/*  toFixed sets max decimals to the right  */}
                                                </Col>
                                                
                                            </Row>
                                        </ListGroup.Item>
                                    
                                        
                                        <ListGroup.Item>
                                            <Row align="center">
                                                <Col md={6}>
                                                    <Link to='/shop' className='btn btn-outline-secondary my-3'>Continue shopping</Link>
                                                </Col>

                                                <Col md={6}>
                                                    <Button
                                                        type='button'
                                                        className='btn btn-primary my-3'
                                                        disabled={cartItems.length === 0}
                                                        onClick={checkOutHandler}>
                                                        PROCEED TO CHECKOUT
                                                    </Button>   
                                                </Col>

                                            </Row>
                                            
                                            
                                        </ListGroup.Item>
                                       
                                    
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                
                    </div>
                )}
            </div>
    )
}

export default CartScreen
