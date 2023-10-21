import React from 'react';

function Pagination({
    itemsPerPage,
    totalItems,
    currentPage,
    paginate,
    changeItemsPerPage,
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="custom-pagination d-flex align-items-center justify-content-end">
            <div className="items-per-page-dropdown">
                <label>Show items per page:</label>
                <select value={itemsPerPage} onChange={(e) => changeItemsPerPage(e.target.value)}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            <button onClick={() => paginate(1)}>Start</button>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "active" : ""}
                >
                    {number}
                </button>
            ))}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
            <button onClick={() => paginate(pageNumbers.length)}>End</button>
        </div>
    );
}

export default Pagination;
