# Clarinet BBoard Reader

A webpage for reading posts from [The Clarinet
BBoard](http://test.woodwind.org/clarinet/BBoard/), offering a more comfortable
reading experience on mobile devices while generally improving design and UX.

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

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
