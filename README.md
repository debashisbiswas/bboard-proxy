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

The Clarinet BBoard is a forum for clarinetists to discuss anything related to
the clarinet and has been around [for over 25
years](http://test.woodwind.org/clarinet/BBoard/list.html?f=1&t=917070343&a=2).
I use the site extensively while studying clarinet repair. Many posts on the
forum are gold mines with information that can't be found anywhere else on the
internet, allow me to teach myself repair topics that I wouldn't be able to
learn anywhere else.

Unfortunately, the original site is not well-suited for this sort of research.
The website's design makes it difficult to read, especially on mobile devices.
Every page on the website has the same title ("The Clarinet BBoard"), so if you
bookmark a forum post, it'll have a generic title unless you update it by hand.

This project solves these problems while improving other areas of the experience
where possible.

## Features and enhancements

- **Responsive design and improved readability**: Comfortable reading on all
screen sizes
- **Clear page titles**: Page titles match the title of the post you're viewing,
giving bookmarks and links clear titles
- **Speed**: Improved performance by preloading data and caching page content
- **Localized times**: Converts post times from the original forum's timezone to
display them in user's local time
- **Extracted post information**: Extracts the author, date, post attachments,
and edit time on each post from the original forum, displaying them with a
custom UI
- **HTTPS**: This project uses HTTPS; the original used HTTP
- **Updated links**: Updates links to other posts on the site to point to the
  new site
- **Social media previews**: When posting a link to a post, the social media
card previews the post title and content using the OpenGraph protocol
- **Search**: Search for posts without visiting the original site

## Implementation

The application works by proxying requests to the original site. For example,
when you visit the homepage, the application will request the original BBoard's
homepage, parse all of the relevant content into an intermediate data structure,
and use the data to render the page. The intermediate translation step gives me
flexibility; rather than simply changing the stylesheet, I can move elements
around and derive data that wasn't available on the original page.

Each request to the application sends a single request to the original site, or
zero requests if the page data is warm in the short-term Redis cache. In local
development, request reponses are cached on-disk long-term to avoid sending many
requests to the original site during hot reloads. This also speeds up local
development.

## Developing

Copy `.env.example` into `.env`. The project is deployed on Vercel, and uses
Vercel KV (Upstash Redis) to cache requests. Fill in your credentials.

Install the dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```
