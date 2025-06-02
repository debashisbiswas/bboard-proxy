<h1 align="center">
<a href="https://clarinet-bboard.vercel.app/">Clarinet BBoard Reader</a>
</h1>

<h3 align="center">
A mobile-focused reader for the Clarinet BBoard focused on readability, design,
and UX.
</h3>

---

<p align="center"><img src="hero.png"></p>

<a href="https://clarinet-bboard.vercel.app/">Check it out here.</a>

A webpage for viewing posts from [the original Clarinet
BBoard](http://test.woodwind.org/clarinet/BBoard/list.html?f=1), offering a more
comfortable reading experience on mobile devices and improving design and UX.

## Features

- **Responsive design**: Comfortable reading on all screen sizes
- **Extracted post information**: Re-displays the author, date, post
attachments, and edit time on each post
- **Improved readability**: Updated font family and font sizes
- **Localized and humanized times**: Times are shown in the user's timezone and
relative to the current time (today at 11am, yesterday at 6pm...)
- **Updated links:**: Any links which point to the original site are updated to
point to this one
- **Page titles**: Page titles match the title of the post you're viewing;
bookmarks and links have the title of the post
- **Social media previews**: Social media previews show the post title and
content using OpenGraph
- **Cached content**: Improved performance and reduced traffic to the original
site by caching page content
- **Search**: Search for posts without visiting the original site

## Developing

Once you've created a project and installed dependencies with `npm install` (or
`pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

## Building

To create a production version:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
