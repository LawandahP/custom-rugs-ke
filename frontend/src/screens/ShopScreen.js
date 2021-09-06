import { Row, Col } from 'react-bootstrap'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import  Product  from '../components/Product'
import  Loader  from '../components/Loader'
import  Message  from '../components/Message'
import  Paginate  from '../components/Paginate'

import { listProducts } from '../actions/productActions'


function ShopScreen({ history }) {

    const dispatch = useDispatch() 
    const productList = useSelector(state => state.productList) // renders products to page
    const { error, loading, products, page, pages } = productList

    let search = history.location.search
    

    useEffect(() => {
        dispatch(listProducts(search))  
       
    }, [dispatch, search])


    return (
        <div>
            {/* <h1>Latest Merch</h1> */}
            { loading && <Loader className="my-6"/>}
            { error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                    <Row className="my-2">
                        {products.map(product => (
                            <Col style={{textAlign: "center"}} key={product.slug} xs={6} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} search={search}/>
                </div>
            } 
        </div>
    )
}

export default ShopScreen
