import React, { useState, useEffect } from 'react';
import api from '../api';

const Pokecard = ({ title, imgUrl }) => {
	return (
		<div className="pokecard">
			<div className="card">
				<div className="imgBx">
					<img src={imgUrl} alt="" />
				</div>
				<div className="content">
					<h3>{title}</h3>
					<button>Add to cart</button>
				</div>
			</div>
		</div>
	)
}


function PokecardsList() {
	const [pokemons, setPokemons] = useState([]);
	const [nextPage, setNextPage] = useState("");
	const [prevPage, setPrevpage] = useState("");

	const getAllPokemons = async () => {
		let response = await api.get('/pokemon');
		const { next, previous, results } = response.data;

		setNextPage(next);
		setPrevpage(previous);

		const all = await Promise.all(results.map(item => api.get(item.url)));

		const data = all.map(response => {
			let data = response.data;
			return {
				id: data.id,
				name: data.name,
				image: `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`
			}
		});

		setPokemons(data)

	}

	useEffect(() => {
		getAllPokemons()
	}, [])

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