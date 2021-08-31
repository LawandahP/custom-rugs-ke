import React, { useState, useEffect } from 'react'
import { Form, Button, InputGroup, Image } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'

import { saveShippingAddress } from '../actions/cartActions'

import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'


function ShippingScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    

    const [county, setCounty] = useState(shippingAddress.county)
    const [subCounty, setsubCounty] = useState(shippingAddress.subCounty)
    const [ward, setWard] = useState(shippingAddress.ward)
    const [shippingCompany, setShippingCompany] = useState(shippingAddress.shippingCompany)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ county, subCounty, ward, shippingCompany }))
        history.push('/payment')
        console.log('Submitted')
    }

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        }
    }, [userInfo])

    return (
        <FormContainer>
            {/* load in CheckoutSteps component */}
            <CheckoutSteps step1 step2/>
            <h4 className="my-2">Shipping Info</h4>
            <Form> 
                <Form.Group controlId='county' className="my-2">
                <Form.Label>County</Form.Label>
                    <Form.Control as="select"
                        value={county ? county : ""}
                        onChange={(e) => setCounty(e.target.value)}>
                            

                            <option>Mombasa</option>
                            <option>Kwale</option>
                            <option>Kilifi</option>
                            <option>Tana River</option>
                            <option>Lamu</option>
                            <option>Taita-Taveta</option>
                            <option>Garissa</option>
                            <option>Wajir</option>
                            <option>Mandera</option>
                            <option>Marsabit</option>
                            <option>Isiolo</option>
                            <option>Meru</option>
                            <option>Tharaka-Nithi</option>
                            <option>Embu</option>
                            <option>Kitui</option>
                            <option>Machakos</option>
                            <option>Makueni</option>
                            <option>Nyandarua</option>
                            <option>Nyeri</option>
                            <option>Kirinyaga</option>
                            <option>Murang'a</option>
                            <option>Kiambu</option>
                            <option>Turkana</option>
                            <option>West Pokot</option>
                            <option>Samburu</option>
                            <option>Trans Nzoia</option>
                            <option>Uasin Gishu</option>
                            <option>Elgeyo-Marakwet</option>
                            <option>Nandi</option>
                            <option>Baringo</option>
                            <option>Laikipia</option>
                            <option>Nakuru</option>
                            <option>Narok</option>
                            <option>Kajiado</option>
                            <option>Kericho</option>
                            <option>Bomet</option>
                            <option>Kakamega</option>
                            <option>Vihiga</option>
                            <option>Bungoma</option>
                            <option>Busia</option>
                            <option>Siaya</option>
                            <option>Kisumu</option>
                            <option>Homa Bay</option>
                            <option>Migori</option>
                            <option>Kisii</option>
                            <option>Nyamira</option>
                            <option>Nairobi</option>    

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='county' className="my-2">
                    <Form.Label>Sub County(constituency)</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Enter constituency'
                        value={subCounty ? subCounty : ''}
                        onChange={(e) => setsubCounty(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='ward' className="my-2">
                    <Form.Label>Ward</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Enter ward'
                        value={ward ? ward : ''}
                        onChange={(e) => setWard(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="shipping" className="my-2">
                    <Form.Label>Shipping Company</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Ship with..'
                        value={shippingCompany ? shippingCompany : ''}
                        onChange={(e) => setShippingCompany(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button 
                    type="submit" 
                    variant="primary"
                    onClick={submitHandler}>
                        Next
                </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
