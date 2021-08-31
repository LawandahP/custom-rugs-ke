import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Image } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { listOrders } from '../actions/orderActions'
import { Link } from 'react-router-dom'

import { commafy } from '../constants/cartConstants'




function OrderListScreen({history}) {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push("/shop")
        }
        
    }, [dispatch, history, userInfo])

    
        

    return (
        <div>
            <h2 style={{color: '#000'}}>Orders</h2>

            {loading
            ? <Loader />
            : error
            ? <Message variant="danger">{error}</Message>
            : (
                <Table striped responsive className="table-sm" hover>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Date</th>
                            <th>T.Price</th>
                            <th>Payment method</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                        </tr>
                        
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order.slug}>

                                <td>{order.user && order.user.full_name}</td>
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

                                <td> {order.isDelivered 
                                        ? <i class="fas fa-check" style={{color: "rgb(67, 211, 0)"}}></i>
                                        : <i class="fas fa-times-circle" style={{color: "rgb(255, 0, 0)"}}></i>
                                        }
                                </td>

                                <td>
                                    <Link to={`/order-details/${order.slug}`}>
                                        <Button variant="primary" 
                                            className="btn-sm"
                                            title="See order details">
                                            See Details 
                                        </Button>
                                    </Link>
                                    
                                        
                                    {/* <Button
                                        variant="danger"
                                        className="btn-sm" 
                                        title="Delete User"
                                        onClick={() => deleteHandler(user.slug)}>
                                        <i class="fas fa-trash-alt"
                                        ></i> 
                                    </Button> */}
                                         
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>

                </Table>
            )}
        </div>
    )
}

export default OrderListScreen
