import React, { useState, useEffect } from 'react'
import { Button, Row, ListGroup, Card, Image, Col, Badge, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { PayPalButton } from "react-paypal-button-v2";

import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
// adds commas to price
import { commafy } from '../constants/cartConstants'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import { mpesaStkPush } from '../actions/mpesaAction';



function OrderDetailsScreen({ match, history }) {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const stkPush = useSelector(state => state.stkPush)
    const { loading: loadingStkPush, success: successStkPush, error: errorStkPush } = stkPush

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    
    
    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
    }

    // paypal payments
    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = "https://www.paypal.com/sdk/js?client-id=AXI6IiovmA6YeA7lky_hOgAWGfYNl5ZLsBrcD2j4gZjZyq7xQxf7D9_w5DoqxFyHbh_7GW6HIWOCtq4q"
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }


    useEffect(() => {

        if(!userInfo) {
            history.push('/login')
        }

        if(!order || successPay || order.slug !== orderId|| successDeliver)  {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})

            dispatch(getOrderDetails(orderId))

        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }          
    }, [dispatch, order, orderId, successPay, successDeliver])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const stkPushHandler = () => {
        dispatch(mpesaStkPush())
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <div>
            <p className="my-4">Order No: <span style={{color: '#f16100'}}>{order._id}</span></p>
            <Row>
                <Col md={8} className="my-2">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>Shipping</h4> 
                            <p>Shipping To: {order.shippingAddress.county}, {order.shippingAddress.subCounty}, {order.shippingAddress.ward}</p>
                            <p>Phone Number: ({order.user.phone_number})</p>
                            <p>Email: <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            {order.isDelivered 
                                ? <p><Badge bg="success">Delivered on {order.deliveredAt.substring(0, 10)}</Badge></p>
                                : <p>Delivered: <i class="fas fa-times-circle" style={{color: "rgb(255, 0, 0)"}}></i></p>
                            }
                            
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h4>Payment Method</h4>
                            <p>
                                <strong>Method: </strong>
                                    {order.paymentMethod ? ("") : ("Choose Payment Method")}
                                      
                                    {order.paymentMethod === "M-Pesa" ?
                                        <Image src="https://www.gtbank.co.ke/uploads/transforms/general/47459/mpesa_af599ee76a60a3ffac0b778428c6ae2f.png" style={{width: 50, height: 'auto'}} />
                                        : ("")
                                    }
                                    
                                    {order.paymentMethod === "Paypal" ?  
                                        <Image src="https://learning-tribes.com/wp-content/uploads/2021/01/paypal-logo-png-transparent-1024x333.png" style={{width: 70, height: 'auto'}} />
                                        : ("")
                                        // order.user.email
                                    }    
                            </p>
                           
                            {order.isPaid 
                                ? <p><Badge bg="success">Paid on {order.paidAt.substring(0, 10)}</Badge></p>
                                : <p>Paid: <i class="fas fa-times-circle" style={{color: "rgb(255, 0, 0)"}}></i></p>
                            }
                           
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h4>Items  In your Order</h4>

                            { order.orderItems.length === 0 ? <Message variant="warning">
                                Your order is empty <Link to='/shop'>Add Items to order</Link>
                            </Message> : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={2} xl={2}>
                                                    <Link to={`/product/${item.product}`}><Image src={item.image} alt={item.name} style={{width: 50, height: 'auto'}} roundedCircle responsive/></Link>
                                                </Col>

                                                <Col xs={3} xl={3}>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                               
                                                <Col xs={4} xl={3}>
                                                    
                                                    {item.qty} x {commafy(item.price)}
                                                </Col>

                                                <Col xs={3} xl={4}>
                                                    {commafy((item.qty * item.price).toFixed(2))}
                                                </Col>

                                                {/* <Col xs={1} xl={1}>
                                                    
                                                    <i className="fas fa-trash-alt"
                                                        title="remove item from order"
                                                        style={{color: '#FF0000'}}
                                                        type="button"
                                                        variant="danger"
                                                        onClick={() => removeFromorderHandler(item.product)}>
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
                            
                            <ListGroup.Item>
                                <h3>Order Summary</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>KES {commafy(Number(order.itemsPrice).toFixed(2))}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>KES {commafy(Number(order.shippingPrice).toFixed(2))} </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>KES {commafy(Number(order.taxPrice).toFixed(2))} </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>KES {commafy(Number(order.totalPrice).toFixed(2))} </Col>
                                </Row>
                            </ListGroup.Item>
                            
                            
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {order.paymentMethod === "M-Pesa" 
                                        ?   <div className="d-grid gap-2 my-2">
                                                <Button
                                                    size="sm"
                                                    style={{borderRadius: '2rem'}}
                                                    onClick={stkPushHandler}
                                                    type='submit' 
                                                    className='btn btn-outline' 
                                                    variant="outline-primary">
                                                    <Image className='mb-2' src="https://cdn-images-1.medium.com/fit/t/1600/480/1*ku2fgiHHIfl_VOatvwwZGw.png" style={{width: 150, height: 'auto'}} />
                                                    {loadingStkPush &&  <Spinner
                                                            style={{color: 'green'}}
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                        />
                                                    }
                                                    
                                                </Button>
                                            </div>
                                            
                                        :   <div>
                                                {!sdkReady ? (
                                                    <Loader />
                                                ) : (
                                                    <PayPalButton
                                                        amount={order.totalPrice}
                                                        onSuccess={successPaymentHandler} />
                                                )}
                                            </div>
                                    }
                                    {errorStkPush && <Message variant="danger">{errorStkPush}</Message>}
                                   

                                    
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                    {successStkPush && <Message variant="success">An stk push has been sent to your phone</Message>}
                            </ListGroup.Item>

                        </ListGroup>

                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <div className="d-grid gap-2 my-2">
                                    <Button type="button"
                                            variant="success"
                                            className="btn btn-block"
                                            onClick={deliverHandler}>
                                        Mark as Delivered   <i class="fas fa-truck"></i>
                                    </Button>
                                </div>
                               
                            </ListGroup.Item>
                        )}


                    </Card>

                </Col>
            </Row>
            
        </div>
    )
}

export default OrderDetailsScreen


// {!sdkReady ? (
//     <Loader />
// ) : (
//     <PayPalButton
//         amount={order.totalPrice}
//         onSuccess={successPaymentHandler} />

// )}