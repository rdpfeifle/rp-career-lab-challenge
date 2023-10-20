export function ArtworkDetails({ searchResults }) {
	return (
		<>
			{searchResults.map((artwork) => (
				<li key={artwork.image_id}>
					<h3>{artwork.title}</h3>
					<p>Artist: {artwork.artist_title || 'Unknown'}</p>
				</li>
			))}
		</>
	);
}
