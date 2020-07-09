import React, { useState, useEffect } from 'react';
import './App.scss';
import api from './utils/api';
import Pokecard from './components/Pokecard';
import Cart from './components/Cart';
import randomInt from './utils/randomInt';
import Modal from './components/Modal';
import Button from './components/Button';
import Search from './components/Search';
import CartMobile from './components/Cart-mobile';
import Pagination from './components/Pagination';
import Loading from './components/Loading';

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
	const [isLoading, setIsLoading] = useState(false);

	const getPokemons = async (filter, changePageUrl) => {
		setIsLoading(true);

		let url = filter ? `/pokemon/${filter}` : '/pokemon';
		let data;
		url = changePageUrl ? changePageUrl : url;

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

		setTimeout(() => setIsLoading(false), 1000);
		setPokemons(data);
	}

	useEffect(() => {
		getPokemons()
	}, []);

	const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart_items')) || []);
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
		localStorage.setItem('cart_items', JSON.stringify(cartItems));
	}, [cartItems])

	const [finishCartModal, setFinishCartModal] = useState(false);

	const finishModalHandler = () => setFinishCartModal(!finishCartModal);
	const onCloseFinishModal = () => {
		setCartItems([]);
		setFinishCartModal(false);
		localStorage.removeItem('cart_items')
	}

	const removeCartItem = (itemId) => {
		let items = cartItems;
		const index = items.map(item => item.id).indexOf(itemId);
		items.splice(index, 1);
		setCartItems(items);
		localStorage.setItem('cart_items', JSON.stringify(cartItems));
	}

	const changePage = (url) => {
		getPokemons(null, url);
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

							{isLoading ?
								<Loading /> :

								pokemons.map(pokemon => (
									<Pokecard
										key={pokemon.id}
										pokemon={pokemon}
										addToCart={() => addToCart(pokemon)}
									/>
								))
							}

						</div>
					</div>
					<Pagination changePage={changePage} nextPage={nextPage} prevPage={prevPage} />
				</div>

				<CartMobile count={cartItems.length} />
				<Cart items={cartItems} total={totalPrice} finishCart={finishModalHandler} removeItem={removeCartItem} />
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
