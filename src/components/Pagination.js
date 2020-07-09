import React from 'react';
import Button from './Button';

const Pagination = ({ changePage, nextPage, prevPage }) => {
	return (
		<div className="pagination">
			<Button 
				className="arrow" 
				onClick={() => changePage(prevPage)}
				disabled={!prevPage}
			>
				<span>&#8249;</span>
			</Button>
			<Button 
				className="arrow" 
				onClick={() => changePage(nextPage)}
				disabled={!nextPage}
			>
				<span>&#8250;</span>
			</Button>
		</div>
	);
};


export default Pagination;