/**
 * Throughout this file are blocks of comments containing keywords
 * prefixed with `@`. These are JSDoc comments, and they help us
 * describe variables, functions, and other aspects of our code.
 * @see: https://jsdoc.app/
 */

/**
 * An individual piece of artwork found at the `/artworks/search/` endpoint.
 * @typedef {Object} Artwork
 * @property {number} _score
 * @property {string | null} artist_title
 * @property {string} date_display
 * @property {string} image_id
 * @property {{alt_text: string, height: number, width: number}} thumbnail
 * @property {string} title
 */

/**
 * The response from the `/artworks/search/` endpoint. Includes an array of
 * artworks, as well as some `config`, `info`, and `pagination` metadata.
 * @typedef {Object} AICSearchResponse
 * @property {Object} config
 * @property {Array<Artwork>} data
 * @property {Object} info
 * @property {Object} pagination
 * @property {null} preference
 */

/**
 * Search the Chicago Institute of Art's `/artworks/search/` endpoint
 * and get a Promise containing the JSON-encoded response.
 * @param {string} query
 * @returns {Promise<AICSearchResponse>}
 */
export async function searchArtworks(query) {
	/**
	 * Get data from `ARTWORKS_SEARCH_RESULT.json`, which is served by our
	 * local server.
	 */
	const requestUrl = `/ARTWORKS_SEARCH_RESULT.json`;

	const headers = { Accept: 'application/json' };

	try {
		const res = await fetch(requestUrl, { headers });

		if (!res.ok) {
			throw new Error('Failed to fetch data.');
		}

		const json = await res.json();
		const filteredResults = json.data.filter((artwork) => {
			const lowerCaseQuery = query.toLowerCase();
			const lowerCaseTitle = artwork.title.toLowerCase();
			// first, double check if the artist_title exists
			const lowerCaseArtistTitle =
				artwork.artist_title && artwork.artist_title.toLowerCase();

			return (
				lowerCaseTitle.includes(lowerCaseQuery) ||
				// Check if lowerCaseArtistTitle exists to correctly trigger showInvalidQuery
				(lowerCaseArtistTitle && lowerCaseArtistTitle.includes(lowerCaseQuery))
			);
		});

		return filteredResults;
	} catch (error) {
		console.error('Unable to retrieve artworks data at this time.', error);
	}
}
