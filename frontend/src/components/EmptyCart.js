import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

function EmptyCart() {
    return (
        <div className="pt-5" style={{textAlign: "center", alignContent: "center"}}>
            <Row>
                <i style={{fontSize: "12rem", color: '#f16100'}} class="fas fa-cart-arrow-down"></i>
                
            </Row>
            
            <Link to='/shop' className='btn btn-outline-secondary my-3'>Add Items to Cart</Link>
          
            
        </div>
    )
}

export default EmptyCart
