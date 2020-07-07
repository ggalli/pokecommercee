import React, { useState, useEffect } from 'react';
import './App.scss';
import api from './utils/api';
import Pokecard from './components/Pokecard';
import Cart from './components/Cart';
import randomInt from './utils/randomInt';
import Modal from './components/Modal';
import Button from './components/Button';
import Search from './components/Search';

const deserialize = (data) => {
	if (Array.isArray(data)) {
		return data.map(item => {
			const { id, name, abilities } = item.data;

			return {
				id,
				name,
				image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
				price: randomInt(100, 10000),
				abilities: abilities.map(item => item.ability.name)
			}
		});
	} else {
		const { id, name, abilities } = data;

		return [{
			id,
			name,
			image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
			price: randomInt(100, 10000),
			abilities: abilities.map(item => item.ability.name)
		}]
	}

}

function App() {
	const [pokemons, setPokemons] = useState([]);
	const [nextPage, setNextPage] = useState("");
	const [prevPage, setPrevpage] = useState("");

	const getPokemons = async (filter) => {
		let url = filter ? `/pokemon/${filter}` : '/pokemon';
		let data;

		let response = await api.get(url);

		if (filter) {
			data = deserialize(response.data);
		} else {
			const { next, previous, results } = response.data;

			setNextPage(next);
			setPrevpage(previous);

			const all = await Promise.all(results.map(item => api.get(item.url)));

			data = deserialize(all);
		}

		setPokemons(data);
	}

	useEffect(() => {
		getPokemons()
	}, []);

	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	const addToCart = (item) => {
		if (cartItems.some(data => data.id === item.id)) {
			return alert(`O ${item.name} já está no carrinho.`);
		}
		setCartItems([...cartItems, item]);
	}

	const calculateTotal = () => {
		const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
		const total = cartItems.length > 0 ? cartItems.reduce(reducer, 0) : 0;
		setTotalPrice(total)
	}

	useEffect(() => {
		calculateTotal()
	}, [cartItems])

	const [finishCartModal, setFinishCartModal] = useState(false);

	const finishModalHandler = () => setFinishCartModal(!finishCartModal);
	const onCloseFinishModal = () => {
		setCartItems([]);
		setFinishCartModal(false);
	}

	return (
		<main>
			<section className="shopping">
				<div className="shopping-list">
					<header className="header">
						<h1>Pokecommerce</h1>
						<Search searchPokemon={getPokemons} />
					</header>

					<div className="pokecards-container">
						<div className="pokecards-list">
							{pokemons.map(pokemon => (
								<Pokecard
									key={pokemon.id}
									pokemon={pokemon}
									addToCart={() => addToCart(pokemon)}
								/>
							))}
						</div>
					</div>
				</div>

				<Cart items={cartItems} total={totalPrice} finishCart={finishModalHandler} />
			</section>
			{finishCartModal ?
				<Modal onClose={onCloseFinishModal}>
					<h3 className="finishCart-text">Compra realizada com sucesso!</h3>
					<Button onClick={onCloseFinishModal} className="finishCart-btn">OK</Button>
				</Modal>
				: null
			}
		</main>
	);
}

export default App;
