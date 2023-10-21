import './ArtworkDetails.css';

export function ArtworkDetails({ searchResults, onArtworkSelect }) {
	return (
		<>
			{searchResults.map((artwork) => (
				<li key={artwork.image_id}>
					<button
						aria-label={`View details of ${artwork.title}`}
						className="artwork-btn"
						type="button"
						onClick={() => onArtworkSelect(artwork)}
					>
						{artwork.title} by {artwork.artist_title || 'Unknown Artist'}.
					</button>
				</li>
			))}
		</>
	);
}
