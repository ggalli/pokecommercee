import React from 'react';
import Button from './Button';

const Pokecard = ({ title, imgUrl }) => {
	return (
		<div className="pokecard">
			<div className="card">
				<div className="imgBx">
					<img src={imgUrl} alt="" />
				</div>
				<div className="content">
					<h3>{title}</h3>
					<Button 
						text="Add to cart"
					/>
				</div>
			</div>
		</div>
	)
}


function PokecardsList({pokemons}) {
	return (
		<div className="pokecards-container">
			<div className="pokecards-list">
				{pokemons.map(pokemon => (
					<Pokecard key={pokemon.id} title={pokemon.name} imgUrl={pokemon.image} />
				))}
			</div>
		</div>
	)
}

export default PokecardsList;