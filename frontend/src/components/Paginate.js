import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { Link } from 'react-router-dom';



function Paginate({pages, page, search='', isAdmin=false }) {

    if(search) {
        search = search.split('?search=')[1].split('&')[0]
    }
    console.log('search:', search)


    return (pages > 1 && (
        <Pagination variant="info">
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer 
                    key={x + 1}
                    to={!isAdmin ?
                        `shop/?search=${search}&page=${x + 1}`
                        : `products/?search=${search}&page=${x + 1}`}>
                    <Pagination.Item color="#f16100" active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))} 
        </Pagination>
    )
    )
}

export default Paginate
