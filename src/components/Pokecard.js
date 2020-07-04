import React from 'react';
import Button from './Button';

const Pokecard = ({ pokemon, addToCart }) => {
	const { name, image, price, abilities } = pokemon;
	return (
		<div className="pokecard">
			<div className="card">
				<div className="imgBx">
					<img src={image} alt="" />
				</div>
				<div className="content">
					<h3>{name}</h3>
					<span className="price">R$ {price}</span>
					<div className="abilities">
						<span>ABILITIES</span>
						<span>{abilities.join(' | ')}</span>
					</div>
					<Button 
						onClick={addToCart}
					>
						Comprar
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Pokecard;