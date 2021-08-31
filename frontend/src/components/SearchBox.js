import React, {useState} from 'react'
import { Button, Col, Form, InputGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import FormContainer from './FormContainer'



function SearchBox() {

    const [search, setSearch] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if(search || history.location.pathname === "/shop") {
            history.push(`shop/?search=${search}&page=1`)
        } else {
            history.push(history.location.pathname)
        }
    }


    return (

        <Form onSubmit={submitHandler} inline>
             <InputGroup>
                 <Form.Control 
                    style={{color: '#f16100', height: "100%", borderRadius: "3rem", borderColor: "#f16100"}}
                    placeholder="search..."
                    aria-label="search"
                    onChange={(e) => setSearch(e.target.value)}
                    /> 
                  <Button
                    type='submit'
                    title="search"  
                    style={{color: '#f16100'}}
                    variant="none" 
                    id="search-button">
                    <i className="fas fa-search"></i>
                 </Button>  
             </InputGroup>      
         </Form>
        
        

       
        
    )
}

export default SearchBox
