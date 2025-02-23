---
title: 'Integrated Security (Realm Tech Overview)' 
date: 'September 12, 2024'
category: "technical"
showToc: false
showTopImage: true
image: '/posts/realm/social.webp'
---

The team at Asimov Collective recently wrapped up a new brand identity for [Realm](https://x.com/realmalliance), the foundational physical security platform for critical industry.

You can find the site [here](https://www.realmalliance.com/).

[![Realm](/posts/realm/social.webp)](https://realmalliance.com/)

---

## The Stack

The site is built using our typical stack: 
* React, with [Next.js](https://nextjs.org/) as our meta-framework ([pages router](https://nextjs.org/docs/pages))
* [Tailwind CSS](https://tailwindcss.com/) for styling 
* [Motion](https://motion.dev/) for animations
* [TinaCMS](https://tina.io/) for content management

## Technical Highlights

### 3D Scene

We built out a complex 3D scene using [Three.js](https://threejs.org/) and [React Three Fiber](https://r3f.docs.pmnd.rs/). The scene uses a base GLTF model of mountains and a scene on top of a series of buildings. We built a complex grid shader that takes in the density as a parameter, allowing us to visualize depth. You can see the scene in action below:

<video controls className='w-full h-96'>
    <source src="/posts/realm/3d-scene.mp4" type="video/mp4" />
</video>

Alongside the custom shader for the grid system, we also built out a system that orchestrated the highlighting the buildings one by one. This involved keeping track of the highlighted building in state, and lerping the color in a `useFrame` hook.

Some other stuff, that you would think would be trivial, but were actually somewhat complex:
* Highlighting visible edges of buildings using `<lineSegments />` and `<edgesGeometry />`.
* Adding camera controls within bounds for a semi-orbitable scene.
* Creating a custom `pulsatingRadialGradient` shader for the circle that appears under the center building.

### Expanding Menu

We leveraged `motion`'s [layout animations](https://motion.dev/docs/react-layout-animations) to create an expanding menu animation.

<video controls className='w-full h-96'>
    <source src="/posts/realm/expanding-menu.mp4" type="video/mp4" />
</video>

Layout animations can always be tricky, especially when trying to prevent distortions, but after tweaking we ended up with a nice effect.

### Internationalization

This was our first project carrying out internationalization via [i18next](https://github.com/i18next/next-i18next)—a great tool. As a result, we moved all copy to a `locales/common.json` file, which had a side effect of becoming a lightweight CMS in a way.

<video controls className='w-full h-96'>
    <source src="/posts/realm/internationalization.mp4" type="video/mp4" />
</video>

## Integrated Security

The project was a fun one to work on, and we're really proud of the result. Check out Realm [here](https://realmalliance.com/)—and as always, get in touch with us at [Asimov Collective](https://asimovcollective.com/) with any related design and development needs.