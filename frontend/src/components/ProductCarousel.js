import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'

import Message from './Message'
import Loader from './Loader'

import { listTopProducts } from '../actions/productActions'


function ProductCorousel() {

    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { error, loading, products } = productTopRated


    useEffect(() => {
        dispatch(listTopProducts())
    }, dispatch)


    return ( loading ? <Loader />
    : error
    ? <Message variant="danger">{error}</Message>
    : (
        <Carousel pause="hover" className="bg-dark">
            {products.map(product => (
                <Carousel.Item key={product.slug}>
                    <Link to={`product/${product.slug}`}>
                        <Image src={product.image} alt={product.name} fluid/>
                        <Carousel.Caption className="carousel.caption">
                            {product.name}
                            (KES {product.price})
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
        
    )
}

export default ProductCorousel