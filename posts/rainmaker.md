---
title: 'Making Earth Habitable (Rainmaker Tech Overview)' 
date: 'May 8, 2024'
category: "technical"
showToc: false
showTopImage: true
image: '/posts/rainmaker/social.webp'
unlisted: false
---

The team at Asimov Collective recently wrapped up a new brand identity for [Rainmaker](https://x.com/RainmakerCorp), a cloud seeding startup that provides water for farms, watersheds, and ecosystems, fortifying growth and stewarding the natural world.

You can find the site [here](https://www.rainmaker.com/).

[![Rainmaker](/posts/rainmaker/social.webp)](https://rainmaker.com/)

---

## The Stack

The site is built using our typical stack: 
* React, with [Next.js](https://nextjs.org/) as our meta-framework ([pages router](https://nextjs.org/docs/pages))
* [Tailwind CSS](https://tailwindcss.com/) for styling 
* [Motion](https://motion.dev/) for animations
* [TinaCMS](https://tina.io/) for content management

## Technical Highlights

### Beautiful Imagery

The site includes a lot of beautiful images. We had to be thoughtful about rendering these images, as we want them to be high-res enough to appear unpixelated, but small enough to load quickly. 

Our approach was to use the default Next.js `<Image />` component. We made use of [static imports](https://nextjs.org/docs/pages/building-your-application/optimizing/images#local-images) so that these unchanging images would have aggressive caching, and blur placeholders would be supported out of the box.


### Animations & Page Transitions

The site features some cool animations and page transitions. Page transitions in NextJS can be somewhat tricky, we followed the methods documented in [this article](https://blog.olivierlarose.com/articles/nextjs-page-transition-guide).

<video controls className='w-full h-96'>
    <source src="/posts/rainmaker/page-transition.mp4" type="video/mp4" />
</video>

### Karaoke Text, With Icons

The site features a few narrative blocks that use the popular "karaoke text" reveal effect. (This isn't exactly an agreed upon term for the effect, but its what we use internally 🤷).

<video controls className='w-full h-96'>
    <source src="/posts/rainmaker/karaoke.mp4" type="video/mp4" />
</video>

We extended this effect in a few different ways. One fun approach used inline icons that were highlighted as the text was revealed.

<video controls className='w-full h-96'>
    <source src="/posts/rainmaker/karaoke-with-icons.mp4" type="video/mp4" />
</video>

Technically, this was a challenge, because we wanted the client to be able to edit text inline. Since Tina is a "Markdown CMS", it's not super straightforward to render custom content in what would otherwise be a traditional paragraph.

To solve this, we worked smarter, not harder, and embedded obviously-not-editable strings, like `REPLACE_WITH_TREES`, in the paragraph. In our `<Karaoke />` component, we used a map of objects that looked like this:

```
{
  text: "REPLACE_WITH_TREES",
  icon: <TreeIcon />
}
```

to render the text and icons side by side. If the client wanted to remove, or move, an icon, it was as simple as moving or removing that text in the CMS.

We ended up not using this approach in the final site, but had a lot of fun experimenting with it.

### Scroll Driven Pixel Illustrations

Throughout the site you'll notice beautiful pixel illustrations put together by Asimov's designers.

<Image src="/posts/rainmaker/illustration.webp" alt="Scroll-driven pixel illustrations" width={1000} height={1000} className='w-full h-auto' />

To add some dimensionality to the pixel illustrations, we rendered the illustrations as SVG elements with groups. This composition would allow us to handle separate layers in different ways. As one example, how different layers appear and reappear at different times, and how some elements move with the scroll.

<video controls className='w-full h-96'>
    <source src="/posts/rainmaker/scroll-driven-illustrations.mp4" type="video/mp4" />
</video>

This is a powerful technique to take something otherwise static and turn it into a dynamic, interactive experience. As these narrative blocks are meant to tell a story about an evolving environment, it fits that the visual elements evolve as well.

## Making Earth Habitable

The project was a fun one to work on, and we're really proud of the result. Check out Rainmaker [here](https://rainmaker.com/)—and as always, get in touch with us at [Asimov Collective](https://asimovcollective.com/) with your design and development needs.