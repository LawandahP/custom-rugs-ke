import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Image } from 'react-bootstrap'

import RatingComponent from '../components/RatingComponent'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

import { listProducts, deleteProduct, createProduct } from '../actions/productActions'

import { commafy } from '../constants/cartConstants'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


function ProductListScreen({ history, match }) {

    const dispatch = useDispatch()

    const [message, setMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productCreate = useSelector(state => state.productCreate)
    const {error: errorCreate, loading: loadingCreate, success: successCreate, product: createdProduct} = productCreate

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    

    let search = history.location.search

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin) {
            history.push("/login")
        } 

        if(successCreate) {
            history.push(`/edit-product/${createdProduct.slug}`)
        } else {
            dispatch(listProducts(search))
        }

        
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, search])

    const deleteHandler = (id) => {
        if(window.confirm("Are you sure you want to delete this product?")){
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

     

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h2 style={{color: '#000'}}>Products</h2>
                </Col>

                <Col className='text-end'>
                    
                    <Button className="my-3"
                            onClick={createProductHandler}
                            title="Create New Product">
                        
                        
                        {loadingCreate ? "product is being created ..."
                            : !loadingCreate ? "ADD PRODUCT"
                            : ""}

                    </Button>
                   
                        
                </Col>
            </Row>

            {loadingDelete && <Loader/ >}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}

            
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            
            {loading
            ? <Loader />
            : error
            ? <Message variant="danger">{error}</Message>
            : (
                <div>
                <Table striped responsive className="table-sm">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price(KES)</th>
                            <th>Category</th>
                            <th>Rating</th>
                        </tr>
                        
                    </thead>

                    <tbody>
                        {products.map(product => (
                            <tr key={product.slug}>
                                <td><Image src={product.image} alt={product.name} style={{width: 50, height: 'auto'}} roundedCircle responsive/></td>
                                <td>{product.name}</td>
                                <td>{commafy(product.price)}</td>
                                <td>{product.category}</td>
                                <td><RatingComponent value={product.rating}  color={'#f16100'} /></td>
                               
                                <td>
                                    <Link to={`/edit-product/${product.slug}`}>
                                        <Button variant="light" 
                                            className="btn-sm"
                                            title="Edit Product">
                                            <i class="fas fa-user-edit"></i>  
                                        </Button>
                                        

                                    </Link>
                                    
                                        
                                    <Button
                                        variant="danger"
                                        className="btn-sm" 
                                        title="Delete Product"
                                        onClick={() => deleteHandler(product.slug)}>
                                        <i class="fas fa-trash-alt"
                                        ></i> 
                                    </Button>
                                         
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>

                </Table>
                <Paginate pages={pages} page={page} isAdmin={true} />
                </div>
            )}
        </div>
    )
}

export default ProductListScreen


