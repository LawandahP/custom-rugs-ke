import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Accordion, Form, Badge } from 'react-bootstrap'


import RatingComponent from '../components/RatingComponent'
import  Loader  from '../components/Loader'
import  Message  from '../components/Message'

import { commafy } from '../constants/cartConstants'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

import { listProductDetails, createProductReview } from '../actions/productActions'

import { makeStyles } from '@material-ui/core/styles'
import  Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'



//history used to redirect


function ProductScreen({ match, history }) {
    const [Qty, setQty] = useState(1)

    // Rating Choice
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [reviewTitle, setReviewTitle] = useState('')

    const dispatch = useDispatch() //import listProducts action and use it to fetch products from server
   
    const productDetails = useSelector(state => state.productDetails) 
    const { error, loading, product } = productDetails

    const userLogin = useSelector(state => state.userLogin) 
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate) 
    const { error: errorProductReview, loading: loadingProductReview, success: successProductReview } = productReviewCreate

    
    

    useEffect(() => {

        if(successProductReview) {
            setRating(0)
            setReviewTitle('')
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET})
        }

        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match, successProductReview])


    //redirect to card after add to cart button i pressed
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?Qty=${Qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
                rating,
                reviewTitle,
                comment
            }
            
        ))
    }

    

    const labels = {
        0: 'Select Stars',
        1: <p>I hate it! <i style={{color:"#f16100"}} class="fas fa-sad-cry"></i></p>,
        2: <p>I don't like it! <i style={{color:"#f16100"}} class="fas fa-sad-tear"></i></p>,
        3: <p>It's Alright <i style={{color:"#f16100"}} class="fas fa-meh-blank"></i></p>,
        4: <p>I Like it <i style={{color:"#f16100"}} class="fas fa-laugh"></i></p>,
        5: <p>I Love It <i style={{color:"red"}} className="fas fa-heart"></i></p>
      };
      
    const useStyles = makeStyles({
        root: {
            
            display: 'flex',
            alignItems: 'center',
        },
    });

    const classes = useStyles();
    const [hover, setHover] = React.useState(-1);

    
        

    return (
        <div>
            <Link to="/shop">
                <i className="fas fa-arrow-left my-3"></i>
            </Link>
            

            { loading? 
                <Loader />
                : error ? 
                    <Message variant='danger'>{error}</Message>
                :

                <div>
                
                <Row m-y="4">
                    <Col className="my-1 rounded" md={6} sm={12} xl={6}>
                        <Card className="rounded">
                            <Image src={product.image} alt={product.name} fluid />
                        </Card>
                    </Col>

                    <Col className="my-1" md={6} xl={6} >
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h1 style={{color: '#000', textAlign: 'center'}}>{product.name}</h1>

                                <div className="my-1" align="center">
                                <RatingComponent value={product.rating} 
                                text={`${product.numReviews} reviews`} 
                                color={'#f16100'} 
                                style={{textAlign: 'center'}} />
                                </div>
                                

                                <h5 style={{textAlign: 'center'}}>KES {commafy(Number(product.price))}</h5>

                            </ListGroup.Item>

                            <ListGroup.Item className="my-2 mb-2">
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col className='text-start'>
                                                <h5>QUANTITY</h5>
                                            </Col> 
                                            <Col className='text-end'>
                                                {
                                                    product.countInStock > 0 
                                                        ? <h6><Badge bg="success">In Stock</Badge></h6> 
                                                        : <h6><Badge bg="danger">SOLD OUT</Badge></h6>
                                                }
                                            </Col>   
                                        </Row>
                                        
                                        <Row>
                                            <Col md={3} xs={4}>
                                                <Form.Control as="select" value={Qty}
                                                onChange={(e) => setQty(e.target.value)}>
                                                {  
                                                    //create quantity off of countInStock
                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x +1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                                </Form.Control>
                                            </Col>

                                            <Col md={9} xs={8}>
                                                <div className="d-grid gap-2 ">
                                                    <Button 
                                                        onClick={addToCartHandler}
                                                        disabled={product.countInStock == 0}
                                                        type="button">
                                                        Add To Cart
                                                    </Button>
                                                </div>
                                            </Col>

                                        </Row>
                                    </Col>
                                </Row>       
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Description</Accordion.Header>
                                        <Accordion.Body>
                                            <p className="text-muted">{product.description}</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </ListGroup.Item>


                        </ListGroup>
                            
                       
                    </Col>

                    
                        
                </Row>

                {/* REVIEWS SECTION */}

                <Row>
                    
                    <Col md={6} xl={6} md={12}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col className='text-start'>
                                        <h6 style={{color: "#000"}}>
                                            CUSTOMER FEEDBACK
                                        </h6>
                                    </Col> 
                                    <Col className='text-end'>
                                        {product.reviews.length === 0 && <h6><Badge bg="warning">No reviews</Badge></h6>}
                                        {product.reviews.length === 1 && <h6><Badge bg="info">{product.reviews.length} review</Badge></h6>}
                                        {product.reviews.length > 1 && <h6><Badge bg="info">{product.reviews.length} reviews</Badge></h6>}
                                    </Col>   
                                </Row>
                                    
                            </ListGroup.Item>

                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review.slug}>
                                        <strong>{review.created_at.substring(0, 10)} by {review.name.toLowerCase()}</strong>
                                        <RatingComponent value={review.rating} color={'#f16100'} />
                                        {review.rating == 1 && <p>I hate it! <i style={{color:"#f16100"}} class="fas fa-sad-cry"></i></p>}
                                        {review.rating == 2 && <p>I don't like it! <i style={{color:"#f16100"}} class="fas fa-sad-tear"></i></p>}
                                        {review.rating == 3 && <p>It's Alright <i style={{color:"#f16100"}} class="fas fa-meh-blank"></i></p>}
                                        {review.rating == 4 && <p>I Like it <i style={{color:"#f16100"}} class="fas fa-laugh"></i></p>}
                                        {review.rating == 5 && <p>I Love It <i style={{color:"red"}} className="fas fa-heart"></i></p>}
                                        <p>{review.comment}</p>

                                    </ListGroup.Item> 
                                    

                                ))}

                                <ListGroup.Item>
                                    
                                    <h6>leave a review</h6>
                                    
                                    {loadingProductReview && <Loader />}
                                    {successProductReview && <Message variant="success">Review Submitted Successfully</Message>}
                                    {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}

                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId="rating">
                                                <Row>
                                                    <Col className='text-start'>
                                                        <div className={classes.root}>
                                                            <Form.Control
                                                                as="none"
                                                                value={rating}
                                                                onChange={(e) => {
                                                                    setRating(e.target.value);
                                                                }}>
                                                                <Rating style={{color: "#f16100"}}
                                                                    name="rating-feedback"
                                                                    value={rating}
                                                                    precision={1}
                                                                    onChange={(e) => 
                                                                        setRating(e.target.value)
                                                                    }
                                                                    onChangeActive={(event, newHover) => {
                                                                        setHover(newHover);
                                                                    }}
                                                                />
                                                            </Form.Control>  
                                                        </div>
                                                    </Col>

                                                    <Col className='text-end'>
                                                        {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>}
                                                    </Col>
                                                </Row>
                                            </Form.Group> 

                                            <Form.Group controlId="comment">
                                                <Form.Label>Review</Form.Label>
                                                <Form.Control
                                                    placeholder="Tell us more about your rating..."
                                                    as="textarea"
                                                    row='5'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}>
                                                </Form.Control>
                                            </Form.Group>
                                            
                                            <div className="d-grid gap-2 ">
                                                <Button 
                                                    className="my-2"
                                                    disabled={loadingProductReview}
                                                    type="submit">
                                                        submit your review
                                                </Button>
                                            </div>
                                            

                                        </Form>
                                      
                                        
                                    ) : (
                                        <Message variant="info">
                                            Please <Link to="/login">login</Link> to review this product
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            
                        </ListGroup>
                        
                    </Col>

                </Row>


            </div>
            }
        </div>
    )
}

export default ProductScreen
