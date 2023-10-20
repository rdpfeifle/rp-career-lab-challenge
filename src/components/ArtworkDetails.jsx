export function ArtworkDetails({ searchResults, onArtworkSelect }) {
	return (
		<>
			{searchResults.map((artwork) => (
				<li key={artwork.image_id}>
					<p>Artist: {artwork.artist_title || 'Unknown'}</p>
					<button onClick={() => onArtworkSelect(artwork)}>
						{artwork.title}
					</button>
				</li>
			))}
		</>
	);
}
