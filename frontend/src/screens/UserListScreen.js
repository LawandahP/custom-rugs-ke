import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { listUsers, deleteUser } from '../actions/userActions'
import { Link } from 'react-router-dom'

function UserListScreen({history}) {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push("/shop")
        }
        
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {

        if(window.confirm("Are you sure you want to delete this user?")){
            dispatch(deleteUser(id))
        }
        
    }
        

    return (
        <div>
            <h2 style={{color: '#000'}}>users</h2>

            {loadingDelete && <Loader/ >}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}


            {loading
            ? <Loader />
            : error
            ? <Message variant="danger">{error}</Message>
            : (
                <Table striped responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone number</th>
                            <th>Admin</th>
                        </tr>
                        
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user.slug}>
                                <td>{user.full_name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone_number}</td>
                                <td> {user.isAdmin === true
                                        ? <i class="fas fa-check" style={{color: "rgb(67, 211, 0)"}}></i>
                                        : <i class="fas fa-times-circle" style={{color: "rgb(255, 0, 0)"}}></i>
                                        }
                                </td>

                                <td>
                                    <Link to={`/user/edit/${user.slug}`}>
                                        <Button variant="light" 
                                            className="btn-sm"
                                            title="Edit User">
                                            <i class="fas fa-user-edit"></i>  
                                        </Button>
                                    </Link>
                                    
                                        
                                    <Button
                                        variant="danger"
                                        className="btn-sm" 
                                        title="Delete User"
                                        onClick={() => deleteHandler(user.slug)}>
                                        <i class="fas fa-trash-alt"
                                        ></i> 
                                    </Button>
                                         
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>

                </Table>
            )}
        </div>
    )
}

export default UserListScreen
