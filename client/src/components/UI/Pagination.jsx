import React from 'react';

function Pagination({
    itemsPerPage,
    totalItems,
    currentPage,
    paginate,
    changeItemsPerPage,
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleItemsPerPageChange = (event) => {
        const newItemsPerPage = parseInt(event.target.value, 10);
        changeItemsPerPage(newItemsPerPage);
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="custom-pagination d-flex align-items-center justify-content-end gap-2 bg-dark p-1">
            <div className='d-flex align-items-center justify-content-end w-25 gap-2'>
            {/* <div className="items-per-page-dropdown">
                <label>Items per page:</label>
                <select value={itemsPerPage} onChange={(e) => changeItemsPerPage(e.target.value)}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div> */}

            <a href="#" className="link-offset-2 link-underline link-underline-opacity-0" onClick={() => paginate(1)}>&#171;</a>
            <a href="#" className="link-offset-2 link-underline link-underline-opacity-0" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                &#8249;
            </a>
            {pageNumbers.map((number) => (
                <a href="#" 
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "text-success-emphasis" : "link-offset-2 link-underline link-underline-opacity-0"}
                >
                    {number}
                </a>
            ))}
            <a href="#" className="link-offset-2 link-underline link-underline-opacity-0" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                &#8250;
            </a>
            <a href="#" className="link-offset-2 link-underline link-underline-opacity-0" onClick={() => paginate(pageNumbers.length)}>&#187;</a>
            </div>
            <span className='m-2'></span>
        </div>
    );
}

export default Pagination;