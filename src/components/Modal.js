import React from 'react';

const modal = ({ children, onClose }) => {
	return (
		<div className="modal-container">
			<div className="modal">
				{children}
			</div>
			<div className="modal-overlay" onClick={onClose}></div>
		</div>

	);
};


export default modal;