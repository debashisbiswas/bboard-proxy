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

## Motivation

The Clarinet BBoard is a forum for clarinetists to discuss niche topics and has
been around [for over 25
years](http://test.woodwind.org/clarinet/BBoard/list.html?f=1&t=917070343&a=2).

I've used the site extensively while studying clarinet repair. Many posts on the
forum are gold mines with information you can't find anywhere else on the
internet. For example,

- This post discussing the best way to secure loose threaded posts to the body
of a clarinet
([original](http://test.woodwind.org/clarinet/BBoard/read.html?f=1&i=459831&t=459758)),
([new](https://clarinet-bboard.vercel.app/read?f=1&i=459831&t=459758))

- This post discussing the best material to use for lever pins
([original](http://test.woodwind.org/clarinet/BBoard/read.html?f=1&i=237119&t=237119)),
([new](https://clarinet-bboard.vercel.app/read?f=1&i=237119&t=237119))

Unfortunately, the original site is not well-suited for this sort of research.
The website's design makes it difficult to read on all devices, and especially
mobile devices. Every page on the website has the same title ("The Clarinet
BBoard"). If you bookmark or link multiple forum posts somewhere, they will all
have the same title unless you update each one manually.

This project aims to solve these problems while improving other areas of the
experience where possible.

## Enhancements

- **Responsive design and improved readability**: Comfortable reading on all
screen sizes
- **Page titles**: Page titles match the title of the post you're viewing;
bookmarks and links have the title of the post
- **Cached content**: Improved performance and reduced traffic to the original
site by caching page content
- **Localized and humanized times**: Parses post times from the original forum's
timezone to display them in user's local time, relative to the current time
(today at 11am, yesterday at 6pm...)
- **Extracted post information**: Extracts the author, date, post attachments,
and edit time on each post from the original forum, displaying them with a
custom UI
- **HTTPS**: The original site uses HTTP, causing browser warnings and causing
the page to be blocked in some environments; the new version uses HTTPS
- **Updated links**: Any forums which link to another post on to the original
site are updated to point to the new one
- **Social media previews**: When posting a link to a post, the social media
preview shows the post title and content using the OpenGraph protocol
- **Search**: Search for posts without visiting the original site

## Implementation

The application works by proxying requests to the original site. For example,
when you visit the homepage, the application will request the original BBoard's
homepage, parse all of the relevant content into an intermediate data structure,
and use the data to render the page. The intermediate translation step gives me
flexibility; rather than simply changing the stylesheet, I can move elements
around and derive data that wasn't available on the original page.

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
