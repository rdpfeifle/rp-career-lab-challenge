import './ImageDetailsPage.css';

export function ImageDetailsPage({ artwork, goBack }) {
	const { artist_title, title, image_id, thumbnail } = artwork;

	const imgUrl = `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`;

	return (
		<div className="details-page">
			<div className="content">
				<h2>
					{title} by{' '}
					<span className="artist-title">
						{artist_title || 'Unknown Artist'}
					</span>
				</h2>
				<button className="image-details" onClick={goBack}>
					Back
				</button>
			</div>
			<img alt={thumbnail ? thumbnail.alt_text : title} src={imgUrl} />
		</div>
	);
}
