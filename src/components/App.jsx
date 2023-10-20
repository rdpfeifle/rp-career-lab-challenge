import { useState } from 'react';
import { searchArtworks } from '../api';
import { SearchForm } from './SearchForm';
import { ArtworkDetails } from './ArtworkDetails';
import { ImageDetailsPage } from './ImageDetailsPage';
import { Footer } from './Footer';

import './App.css';

export function App() {
	const [searchResults, setSearchResults] = useState([]);
	const [showInvalidQuery, setShowInvalidQuery] = useState('');
	const [selectedArtwork, setSelectedArtwork] = useState(null);
	const [searchButtonClicked, setSearchButtonClicked] = useState(false);

	function onSearchSubmit(query) {
		searchArtworks(query).then((filteredResults) => {
			if (query.trim() === '' || filteredResults.length === 0) {
				setSearchResults([]);
				setShowInvalidQuery(
					'No results found for the artist or title. Please try a different search.',
				);
			} else {
				setSearchResults(filteredResults);
				setShowInvalidQuery('');
			}
			setSearchButtonClicked(true);
		});
	}

	function handleBack() {
		setSelectedArtwork(!selectedArtwork);
	}

	return (
		<>
			{!selectedArtwork ? (
				<div className="App">
					<h1>TCL Career Lab Art Finder</h1>
					<SearchForm onSearchSubmit={onSearchSubmit} />
					<div>
						{searchButtonClicked && <h2>Search Results</h2>}
						<ul>
							<ArtworkDetails
								searchResults={searchResults}
								onArtworkSelect={setSelectedArtwork}
							/>
						</ul>
						{showInvalidQuery && <p>{showInvalidQuery}</p>}
					</div>
					<Footer />
				</div>
			) : (
				<ImageDetailsPage artwork={selectedArtwork} goBack={handleBack} />
			)}
		</>
	);
}
