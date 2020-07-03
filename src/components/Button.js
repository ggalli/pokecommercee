import React from 'react';

const Button = ({text, className}) => {
	return (
		<button className={className ? `${className} button--default` : "button--default"}>
			{text}
		</button>
	)
}

export default Button;