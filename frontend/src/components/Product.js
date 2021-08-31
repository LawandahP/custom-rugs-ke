import React from 'react'

import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import RatingComponent from './RatingComponent' //impoert rating component

import { commafy } from '../constants/cartConstants'

function Product({ product }) {
    return (
        <Card className="p-1 my-1 rounded">
            <Link to={`/product/${product.slug}`}>
                <Card.Img src={product.image} />
            </Link>

            <Card.Body as="div">
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>
                        {product.name}
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-2" >
                        <RatingComponent value={product.rating}  color={'#f16100'} />
                    </div>
                </Card.Text>
                <Card.Text >
                    KES {commafy(Number(product.price))}
                </Card.Text>
            </Card.Body>

        </Card>
    )
}

export default Product
