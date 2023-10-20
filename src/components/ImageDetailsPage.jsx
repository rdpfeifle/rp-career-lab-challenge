import './ImageDetailsPage.css';

export function ImageDetailsPage({ artwork, goBack }) {
	const { artist_title, title, image_id, thumbnail } = artwork;

	const imgUrl = `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`;

	return (
		<div>
			<button onClick={goBack}>Back</button>
			<p>
				The art {title} was created by {artist_title ? artist_title : 'Unknown'}{' '}
				artist.
			</p>
			<img alt={thumbnail ? thumbnail.alt_text : title} src={imgUrl} />
		</div>
	);
}
