import React from 'react';
import './App.scss';
import PokecardsList from './components/PokecardsList';

function App() {
	return (
		<main>
			<section className="shopping">

				<div className="shopping-list">
					<h1>Pokecommerce</h1>

					<PokecardsList />
				</div>

				<div className="shopping-cart">

				</div>
			</section>
		</main>
	);
}

export default App;
