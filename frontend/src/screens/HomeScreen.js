import React from 'react'
import ProductCarousel from '../components/ProductCarousel'
import Gallery from '../components/Gallery'

import { Col, Row } from 'react-bootstrap'

function HomeScreen() {
    return (
    
             
        <div>
            <ProductCarousel />
            <Row className="pt-1">      
                <Col align="center">
                    <h1 style={{color: "#000"}}>Get Your Personalized Rug Today</h1>
                </Col>
            </Row>

            <Row>
                <Col align="center">
                    <p>The best design inspiration - expertly curated for you</p>
                </Col>
            </Row>
            <Gallery />


        </div>
                
    )
}

export default HomeScreen