import React from 'react';
import Button from './Button';

function Cart({ items, total, finishCart, removeItem }) {
	return (
		<div className="shopping-cart">
			<h2>Carrinho</h2>

			<ul className="cart-items">
				{items.map(item => (
					<li key={item.id}>
						<img src={item.image} alt="" />
						<span className="name">{item.name}</span>
						<span className="price">R$ {item.price}</span>
						<button onClick={() => removeItem(item.id)} className="delete">
							<svg height="20px" viewBox="0 0 512 512" width="20px"
								xmlns="http://www.w3.org/2000/svg">
								<path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#f44336" />
								<path d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0" fill="#fafafa" />
							</svg>
						</button>
					</li>
				))}
			</ul>

			<div className="total">
				<span>Total</span>
				<span>R$ {total}</span>
			</div>

			<Button
				className="finishCart"
				onClick={finishCart}
				disabled={items.length === 0}
			>
				Finalizar
			</Button>

		</div>
	)
}

export default Cart;