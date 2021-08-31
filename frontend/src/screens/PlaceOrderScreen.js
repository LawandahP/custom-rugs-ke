import React, { useState, useEffect } from 'react'
import { Button, Row, ListGroup, Card, Image, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { createOrder } from '../actions/orderActions'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
// adds commas to price
import { commafy } from '../constants/cartConstants'
//reset orders
import { ORDER_CREATE_RESET } from '../constants/orderConstants'


function PlaceOrderScreen({ history }) {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate
    

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.Qty * item.price, 0)
    cart.shippingPrice = (cart.itemsPrice > 5500 ? 0 : 300)
    cart.taxPrice = cart.itemsPrice * 0.16
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))

    

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        
        if(success) {
            history.push(`/orders/${order.slug}`)
            dispatch({ type: ORDER_CREATE_RESET })
        } else {
            if(!cart.paymentMethod) {
                history.push('/payment')
            } 
        }
    }, [success, history])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
        console.log("order placed")
        
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>Shipping</h4>
                            <p>
                                <strong>Shipping To: </strong>
                                {cart.shippingAddress.county}, {cart.shippingAddress.subCounty}, {cart.shippingAddress.ward}
                            </p>
                            <p>
                                <strong>Shipping By: </strong>
                                {cart.shippingAddress.shippingCompany}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h4>Payment Method</h4>
                            <p>
                                <strong>Method: </strong>
                                    {cart.paymentMethod ? ("") : ("Choose Payment Method")}  
                                    
                                    {cart.paymentMethod === "M-Pesa" ?  
                                        <Image src="https://www.gtbank.co.ke/uploads/transforms/general/47459/mpesa_af599ee76a60a3ffac0b778428c6ae2f.png" style={{width: 50, height: 'auto'}} />
                                        : ("" )
                                    }
                                    {cart.paymentMethod === "Paypal" ?  
                                        <Image src="http://era-techuk.com/wp-content/uploads/2019/03/pypel-768x290.jpg" style={{width: 70, height: 'auto'}} />
                                        : ("" )
                                    }         
                                
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h4>Order Items</h4>

                            { cart.cartItems.length === 0 ? <Message variant="warning">
                                Your cart is empty <Link to='/shop'>Add Items to Cart</Link>
                            </Message> : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={2} xl={2}>
                                                    <Link to={`/product/${item.product}`}><Image src={item.image} alt={item.name} style={{width: 50, height: 'auto'}} thumbnail responsive/></Link>
                                                </Col>

                                                <Col xs={3} xl={3}>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                               
                                                <Col xs={4} xl={3}>
                                                    {item.Qty} x {commafy(item.price)}
                                                </Col>

                                                <Col xs={3} xl={4}>
                                                    {commafy((item.Qty * item.price).toFixed(2))}
                                                </Col>

                                                {/* <Col xs={1} xl={1}>
                                                    
                                                    <i className="fas fa-trash-alt"
                                                        title="remove item from cart"
                                                        style={{color: '#FF0000'}}
                                                        type="button"
                                                        variant="danger"
                                                        onClick={() => removeFromCartHandler(item.product)}>
                                                    </i>
                                                    
                                                </Col> */}
                                                
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                            
                        </ListGroup.Item>
                    </ListGroup>

                </Col>

                <Col md={4} className="my-2">      
                    <Card>
                        <ListGroup variant="flush">
                            {error && <Message variant="danger">{error}</Message>}
                            <ListGroup.Item>
                                <h3>Order Summary</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>KES {commafy(Number(cart.itemsPrice).toFixed(2))}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>KES {commafy(Number(cart.shippingPrice).toFixed(2))} </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>KES {commafy(Number(cart.taxPrice).toFixed(2))} </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>KES {commafy(Number(cart.totalPrice).toFixed(2))} </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <div className="d-grid gap-2 my-2">
                                    <Button 
                                        type="button"
                                        disabled={cart.cartItems === 0}
                                        onClick={placeOrder}>
                                        Place Order
                                    </Button>
                                </div>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>

                </Col>
            </Row>
            
        </div>
    )
}

export default PlaceOrderScreen
