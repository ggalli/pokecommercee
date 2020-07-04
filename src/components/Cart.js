import React from 'react';
import Button from './Button';

function Cart({ items, total, finishCart }) {
	return (
		<div className="shopping-cart">
			<h2>Carrinho</h2>

			<ul className="cart-items">
				{items.map(item => (
					<li key={item.id}>
						<img src={item.image} alt="" />
						<span className="name">{item.name}</span>
						<span className="price">R$ {item.price}</span>
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
				disabled={items.length == 0}
			>
				Finalizar
			</Button>

		</div>
	)
}

export default Cart;