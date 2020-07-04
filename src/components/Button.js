import React from 'react';

const Button = ({children, className, onClick, disabled}) => {
	return (
		<button 
			className={className ? `${className} button--default` : "button--default"}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default Button;