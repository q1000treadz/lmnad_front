import React from 'react'
import './Sources.css';
const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    

    const nextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <nav>
            <div class="pagination">
            <button className="button-style" onClick={prevPage}>
                        Предыдущая страница
                    </button>
                {pageNumbers.map(pgNumber => (
                    <button key={pgNumber} className= {`button-style ${currentPage === pgNumber ? 'button-active' : ''} `}  
                        onClick={() => setCurrentPage(pgNumber)} >
                           {pgNumber}
                        </button>
                ))}
                <button className="button-style" onClick={nextPage}>
                        Следующая страница
                        </button>
                        </div>
        </nav>
    )
}

export default Pagination
/*

 <nav>
            <ul className='pagination justify-content-center'>
                <li className="page-item">
                    <a className="page-link" 
                        onClick={prevPage} 
                        href='#'>
                        
                        Предыдущая страница
                    </a>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

                        <a onClick={() => setCurrentPage(pgNumber)}  
                            className='page-link' 
                            href='#'>
                            
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="page-link" 
                        onClick={nextPage}
                        href='#'>
                        Следующая страница
                    </a>
                </li>
            </ul>
        </nav>
*/
