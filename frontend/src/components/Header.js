import React from 'react'

import {  useDispatch, useSelector} from 'react-redux'

import { Button, Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

import Message from './Message'
import Loader from './Loader'

import useGeoLocation from './useGeolocation'






function Header() {

    
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    // get info from localStorage/state
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const location = useGeoLocation()
    

    

    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div>
            
            <Navbar variant="" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>CustomRugsKenya</Navbar.Brand>
                    </LinkContainer>
                    {/* {
                        location.loaded ? JSON.stringify(location)
                        : <Loader />
                    } */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav"  />
                    
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">

                        <SearchBox xs={12} /> 
                        
                        <NavDropdown.Divider />
                        
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>

                        <NavDropdown.Divider />

                        <LinkContainer to="/about-us">
                            <Nav.Link>About Us</Nav.Link>
                        </LinkContainer>

                        <NavDropdown.Divider />

                        <LinkContainer 
                            to="/our-projects">
                            <Nav.Link>Our Projects</Nav.Link>
                        </LinkContainer>

                        <NavDropdown.Divider />
                            
                        <LinkContainer to="/shop">
                            <Nav.Link>Shop</Nav.Link>
                        </LinkContainer>

                        <NavDropdown.Divider />

                       
                        {userInfo && !userInfo.isAdmin ? (
                            <div>
                                <NavDropdown title = {
                                                <span>
                                                    <strong><i class="fas fa-user-check"> Hi, {userInfo.username}</i></strong>
                                                </span> 
                                            }>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item><i class="fas fa-user-circle"></i>  My Account</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Divider />
                                    
                                    <NavDropdown.Item onClick={logoutHandler}><i class="fas fa-sign-out-alt"></i>  Logout</NavDropdown.Item>
                                    
                                    
                                </NavDropdown>
                            </div>

                        ) : !userInfo ? (
                                <LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user-circle"></i> SIGN IN</Nav.Link>
                                </LinkContainer>
                        ) : ("")
                            
                        }

                        {userInfo && userInfo.isAdmin ? (
                            <NavDropdown title = {
                                <span>
                                    <strong><i class="fas fa-user-check"> Hi, {userInfo.username}</i></strong>
                                </span> 
                                }>
                                    
                                    <NavDropdown.Item>  Admin</NavDropdown.Item>
                                    

                                <NavDropdown.Divider />

                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item><i class="fas fa-user-circle"></i>  My Account</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/users'>
                                        <NavDropdown.Item><i class="fas fa-users"></i>  Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/products'>
                                        <NavDropdown.Item><i class="fab fa-product-hunt"></i>  Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/orders'>
                                        <NavDropdown.Item><i class="fab fa-product-hunt"></i>  Orders</NavDropdown.Item>
                                    </LinkContainer>

                                <NavDropdown.Divider />
                            
                                <NavDropdown.Item onClick={logoutHandler}><i class="fas fa-sign-out-alt"></i>  Logout</NavDropdown.Item>
                            </NavDropdown>

                        ) : ("")}

                        <NavDropdown.Divider />
                        <LinkContainer align="center" title="cart" to="/cart">
                            <Nav.Link>
                                <i className="fas fa-shopping-cart">
                                <sup style={{fontSize: 15, color: '#f16100', padding: 3}}>
                                                {cartItems.reduce((acc, item) => acc + item.Qty, 0)}
                                    </sup>
                                </i>
                            </Nav.Link>
                        </LinkContainer>


                    </Nav>

                    
                        

                    </Navbar.Collapse>
                    
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
