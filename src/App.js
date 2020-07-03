import React, { useState, useEffect } from 'react';
import './App.scss';
import api from './api';
import PokecardsList from './components/PokecardsList';
import Cart from './components/Cart';

function App() {
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
		<main>
			<section className="shopping">
				<div className="shopping-list">
					<h1>Pokecommerce</h1>
					<PokecardsList pokemons={pokemons} />
				</div>
				<Cart />
			</section>
		</main>
	);
}

export default App;
