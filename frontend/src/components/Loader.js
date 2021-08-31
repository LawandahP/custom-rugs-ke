import React from 'react'
import { Spinner } from 'react-bootstrap'



function Loader() {
    return (
        <Spinner
            animation="border" 
            role="status"
            style={{
                color: '#f16100',
                height:'7rem',
                width:'7rem',
                margin:'auto',
                display:'block'
            }}
        >
            <span className='sr-only'>Loading...</span>
        </Spinner>
    )
}

export default Loader
