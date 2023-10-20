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

	function onSearchSubmit(query) {
		// Search for the users's query.
		searchArtworks(query).then((json) => {
			const filteredResults = json.data.filter((artwork) => {
				const lowerCaseQuery = query.toLowerCase();
				const lowerCaseTitle = artwork.title.toLowerCase();
				// first, double check if the artist_title exists
				const lowerCaseArtistTitle =
					artwork.artist_title && artwork.artist_title.toLowerCase();

				return (
					lowerCaseTitle.includes(lowerCaseQuery) ||
					// first, double check if the lowerCaseArtistTitle exists
					(lowerCaseArtistTitle &&
						lowerCaseArtistTitle.includes(lowerCaseQuery))
				);
			});

			if (query.trim() === '' || filteredResults.length === 0) {
				setSearchResults([]);
				setShowInvalidQuery(
					'No results found for the artist or title. Please try a different search.',
				);
			} else {
				setSearchResults(filteredResults);
				setShowInvalidQuery('');
			}
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
						<h2>Search Results</h2>
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
