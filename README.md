# 🗒️ Let’s look at some art

Your team has been developing an app that allows users to search for public-domain artwork hosted by the [Art Institute of Chicago](https://www.artic.edu/) (AIC). You've inherited some code from a teammate – a React application with some components and some functions for interacting with a search API provided by the AIC. Your task is to finish building out the app according to the acceptance criteria your team has agreed on. We've listed those acceptance criteria in this document and provided some mockups of the app, as well as some tips for working with Art Institute of Chicago's APIs. You're gonna do great!

❗ **Please limit your time spent on this project to no more than _one hour_.** If you don't finish all the acceptance criteria, that's okay! Our goal is to give you something to discuss with your interviewer at the next stage, whether the project is feature-complete or not. You can chat with your interviewer about what you would do with more time.

## Demo

![Demo](/public/career-lab.gif)

## Local development setup

Clone the repository to your local machine by running the following command.

```
git clone https://github.com/rdpfeifle/rp-career-lab-challenge
```

Change the directory to the cloned repository.

```
cd rp-career-lab-challenge
```

Open the project using your favorite text editor, and install the necessary dependencies by running:

```
npm install
```

Start the application by executing the following command. It will open a new window/tab in your default web browser.

```
npm start
```

## ✅ Acceptance criteria

Your team has agreed on the following requirements for the app's MVP (minimum viable product). A teammate has implemented some of these criteria already, and it's your job to finish the rest. Start with `./src/components/App.jsx` to familiarize yourself with your teammate's work, then build on top of it.

- [x] Create a `searchArtworks` function for making GET requests to `/search/artworks/`. See `src/api.js`
  - [x] Request a local copy of data in `searchArtworks` to avoid making too many requests to the AIC's search endpoint while the app is in development
  - [x] **When the UI is complete**, ensure that `searchArtworks` makes requests to the AIC's `/artworks/search/` endpoint, as described in "Using the `/artworks/search/` endpoint"
- [x] Create a `SearchForm` component that will allow the user to perform a search. See `src/components/SearchForm.jsx`
  - [x] Fix a known bug: the whole app refreshes when `SearchForm` is submitted
- [x] In the `App` component, render
  - [x] the `SearchForm` component and
  - [x] a list of results including _the name of the piece_ and _the artist who created the piece_.
- [x] Create an `ImageDetailsPage` component.
- [x] Render `ImageDetailsPage` when the user clicks the title of a piece in the list of results. 💡
- [x] In the `ImageDetailsPage` component, render
  - [x] the name of the piece
  - [x] the artist who created the piece
  - [x] the image associated with the piece (don't forget its alt text!)
  - [x] a back button that returns the user to the list of results

### 💡 On rendering `ImageDetailsPage`

You might think to install React Router to handle the back button functionality. That's probably something you would do in a production application, but your team has agreed that React Router is _out of scope_ for this MVP. Instead, you can use [conditional rendering](https://react.dev/learn/conditional-rendering) to show and hide content. Here's some logic you could use to approach conditional rendering:

- If no artwork is selected, render the the search form with the list of results
- If an artwork is selected, instead render the `ImageDetailsPage` component
- If the back button on `ImageDetailsPage` is clicked, render the search form with the list of results

## 🎨 Mockups

Your designer created some mockups so that everyone has a shared understanding of what the application should look like. You can find them in [the `mockups` directory](./mockups). Remember: these are just mockups! You can use them as a guide, but you don't need to match them exactly.

## 💻 Working with the AIC's data

AIC maintains one API endpoint for searching for artwork data, and another API endpoint for requesting the images from the catalog. AIC's [API documentation](https://www.artic.edu/open-access/public-api) is dense; we’ve outlined the things you should know, starting with the shape of the data you'll be working with.

**⚠️ Read this section carefully.** You will need artwork data in order to request the actual images you want to show to the user!

### 📦 The shape of the artwork data

Requests to the `/artworks/search/` endpoint return **a JSON object**. This object has _a lot_ of information. You should focus on the `data` property, which is an array of objects. While you may not need _all_ of the information in each object, you'll probably need most of it! Each object is shaped as follows:

<table>
	<tr>
		<th>Property name</th>
		<th>Data type</th>
		<th>Description</th>
	</tr>
	<tr>
		<td><code>_score</code></td>
		<td><code>number</code></td>
		<td>The API's confidence that this result is something you're looking for</td>
	</tr>
	<tr>
		<td><code>artist_title</code></td>
		<td><code>string | null</code></td>
		<td>The known artist of the piece (may be <code>null</code>)</td>
	</tr>
	<tr>
		<td><code>date_display</code></td>
		<td><code>string</code></td>
		<td>The known production date of the piece</td>
	</tr>
	<tr>
		<td><code>image_id</code></td>
		<td><code>string</code></td>
		<td>The id of the full image for this catalog item</td>
	</tr>
	<tr>
		<td><code>thumbnail</code></td>
		<td><code>object</code></td>
		<td>An object with the properties <code>alt_text</code>, <code>height</code>, and <code>width</code></td>
	</tr>
	<tr>
		<td><code>thumbnail.alt_text</code></td>
		<td><code>string</code></td>
		<td>The description of the thumbnail image</td>
	</tr>
	<tr>
		<td><code>thumbnail.height</code></td>
		<td><code>number</code></td>
		<td>The height of the thumbnail image</td>
	</tr>
	<tr>
		<td><code>thumbnail.width</code></td>
		<td><code>number</code></td>
		<td>The width of the thumbnail image</td>
	</tr>
	<tr>
		<td><code>title</code></td>
		<td><code>string</code></td>
		<td>The title of the piece</td>
	</tr>
</table>

### 🖼️ Requesting an image

AIC provides an endpoint dedicated to serving images. These image URLs are structured as follows:

```
https://www.artic.edu/iiif/2/{IMAGE_ID}/full/843,/0/default.jpg
```

You should replace `{IMAGE_ID}` with an image ID from the data you retrieve from the `/artworks/search/` endpoint. You can use the resulting URL in an `img` element to show that artwork to your users. For instance, the following `img` element would render Georges Seurat's _La grande jette_ in the browser:

```html
<img
	src="https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg"
/>
```

You can also [open _La grande jette_ in your browser](https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg), if you’d like!

### Using the `/artworks/search/` endpoint

Once you've completed your UI, including successfully rendering artwork images, you can make requests to the `/artworks/search/` endpoint provided by the AIC. Request URLs take on the following shape:

> `https://api.artic.edu/api/v1/artworks/search?q={USER_QUERY}&query[term][is_public_domain]=true&fields=artist_title,date_display,image_id,thumbnail.alt_text,thumbnail.width,thumbnail.height,title`

These URLs are quite long, but you don't need to worry about what each part means. Just know that you need to replace `{USER_QUERY}` with the thing your user searched for in the catalog. If your user searches for “cats”, your request url becomes:

> `https://api.artic.edu/api/v1/artworks/search?q=cats&query[term][is_public_domain]=true&fields=artist_title,date_display,image_id,thumbnail.alt_text,thumbnail.height,thumbnail.width,title`.

Try it our for yourself: [open the “cats” query in your browser](https://api.artic.edu/api/v1/artworks/search?q=cats&query[term][is_public_domain]=true&fields=artist_title,date_display,image_id,thumbnail.alt_text,thumbnail.height,thumbnail.width,title).
