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
                    style={{color: '#f16100', height: "100%", borderColor: "#f16100"}}
                    size="sm"
                    placeholder="search..."
                    aria-label="search"
                    onChange={(e) => setSearch(e.target.value)}
                    /> 
                  <Button
                    type='submit'
                    size="sm"
                    title="search"  
                    style={{background: '#f16100', color: "#fff"}}
                    variant="none" 
                    id="search-button">
                    <i className="fas fa-search"></i>
                 </Button>  
             </InputGroup>      
         </Form>
        
        

       
        
    )
}

export default SearchBox
