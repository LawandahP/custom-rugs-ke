import React, { useState, useEffect } from 'react'
import { Form, Button, InputGroup, Col, Card, Image, Row } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'

import { savePaymentMethod } from '../actions/cartActions'

import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'





function PaymentScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('')

    if (!shippingAddress.county) {
        history.push('/shipping')

    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    


    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Choose a Payment Method</Form.Label>
                        <Card style={{padding: 15, backgroundColor: "white"}}>
                            <Row>
                                <Col md={10} xs={8}>
                                    <Form.Check
                                        checked="" 
                                        type="radio"
                                        value="M-Pesa"
                                        label='Mpesa'
                                        id="mpesa"
                                        name="mpesaMethod"
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        >
                                            
                                    </Form.Check>
                                </Col>
                                <Col md={2} xs={4}>
                                    <Image src="https://www.gtbank.co.ke/uploads/transforms/general/47459/mpesa_af599ee76a60a3ffac0b778428c6ae2f.png" style={{width: 50, height: 'auto'}} />
                                </Col>
                                
                            </Row>
                            
                            
                            
                           
                        </Card>
                        
                        <Card style={{padding: 15, backgroundColor: "white"}} className="my-3">
                            <Row>
                                <Col md={10} xs={8}>
                                    <Form.Check
                                        type="radio"
                                        value="Paypal"
                                        label='PayPal or Credit Card'
                                        id="paypal"
                                        name="paypalMethod"
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        >
                                        

                                    </Form.Check>
                                </Col>
                            
                                <Col md={2} xs={4}>
                                    <Image src="https://learning-tribes.com/wp-content/uploads/2021/01/paypal-logo-png-transparent-1024x333.png" style={{width: 70, height: 'auto'}} />
                                </Col>

                            </Row>
                        </Card>
                        

                        {/* <fieldset class="form-group">
                            <legend class="mt-4">Radio buttons</legend>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked="">
                                    Option one is this and that—be sure to include why it's great
                                </label>
                            </div>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2">
                                    Option two can be something else and selecting it will deselect option one
                                </label>
                            </div>
                        </fieldset> */}

                    
                
                </Form.Group>

                <Button type="submit" variant="primary">
                    Next
                </Button>

            </Form>
            
        </FormContainer>
    )
}

export default PaymentScreen
