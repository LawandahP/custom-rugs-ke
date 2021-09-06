import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Button, Card, Image } from 'react-bootstrap'

import { listGallery } from '../actions/galleryActions'

import  Loader  from './Loader'
import  Message  from './Message'

function Gallery() {

    const dispatch = useDispatch() 
    const galleryList = useSelector(state => state.galleryList) // renders gallerys to page
    const { error, loading, images } = galleryList

    
    useEffect(() => {
        dispatch(listGallery())  
       
    }, [dispatch])



    
    return (
            <div>
                {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            
                            {/* //gallery */}

                            <Row className="pt-5" align="center">
                            { images.map(image => (
                                <Col md={6} xs={6} sm={6} xl={3} className="my-2">
                                    <Card style={{boxShadow: "2px 2px 2px 2px grey", borderRadius: "1rem"}}>
                                        <Image style={{ borderRadius: "1rem", boxShadow: "5px"}} src={image.picture}></Image>
                                    </Card>
                                </Col>
                            ))}
                            </Row>
                        </div>
                    
                    
                    )}
            </div>
    )
}

export default Gallery
