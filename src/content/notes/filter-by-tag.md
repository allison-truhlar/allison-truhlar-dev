---
title: "How to filter Astro content collections by multiple tags"
description: "A method using Nano Stores"
pubDate: "Aug 18 2024"
heroImage: "/post_img.webp"
tags: ["Astro"]
---

Filtering by tags was one of the main requirements for the OSSI website that led me to choose Astro. While it is a static site generator, Astro allows you to add interactive UI components through a frontend architecture called "islands." Islands build on the technique of partial or selective hydration. At built time, Astro automatically strips out client-side JavaScript and renders all components to static HTML and CSS on the server. However, the developer can mark a component as an island by adding a `client:*` directive to the component. The `client:*` directive tells Astro to bundle the JavaScript found in that component, and also provides instructions about when that JavaScript should be loaded (aka, when the component should be "hydrated"). The benefit to islands is faster loading, because most of the website is static HTML, as well as the ability to have parallel loading for components. You can even tell Astro to never load the JavaScript for a component if it doesn't become visible on the page.

## Different `client:*` directives

Shown in my code sample:
`client:load`

- Load and hydrate the component immediately on page load. Uses server-rendered HTML as the intial starting point.
  `client:only={framework}`
- Skip HTML server-rendering and render only on the client. Render the component immediately on page load. Must pass the directive the framework your component uses, since it was not run during the build on the server and therefore Astro doesn't know what to use. I used this directive in cases where the component's classes could differ from the server-rendered HTML classes, due to using URL parameters to set an initial state on page load. This is the case for the tag components, as well as the search input and the project type buttons.
  `client:visible`
- Only load and hydrate the component JavaScript when the component enters the user's viewport. Useful for UI elements far down the page or elements only shown at certain screen sizes/types. Especially useful if these elements are also resource-intensive.

## Astro components can be children of island components in a `.astro` component file

The selected tag state needed to be accessed by both the filter menu and the project cards. Initially, I set up one giant React component that I called the `CardsAndFiltersIsland`, and made the `FilterMenu` and `Card` as React component children. I wanted to be able to reuse the tag component between the project cards and the individual project pages, especially once I added additional functionality that clicking on a tag takes to you the page with the URL parameters set to that tag value. It seemed silly to have an Astro component and React component that were exactly the same. So I refactored the `CardsAndFiltersIsland` to expose all the components contained in that island, and then further determined what content could be rendered statically vs dynamically. While the card container itself needed to be dynamic (whether it was shown or not shown depends on selected tags, selected project type, and keyword search), the content of any given project's card would always be the same - static. So I created Astro components for `CardContent` (title and description) and `Tag`. These can be passed to the React commponent `CardContainer` as children, using the Astro `slot` pattern.

## Nano stores

Moving the tags out of the `CardsAndFiltersIsland` created the additional question of how to share the selected tag state between the filter menu and the project cards, now that they did not have common parent that could pass the state down to both. Astro recommends using the Nano Stores library for sharing state between islands. Nano Stores aligns with Astro in two ways:

- It's framework agnostic and works with React, React Native, Preact, Vue, Svelte, Solid, Lit, Angular, and vanilla JS.
- It ships the minimum amount of JS needed (less than 1KB) with zero dependencies.

I use Nano Stores for managing state for selected tags state, selected project type, search query, holding the search results, and whether the filter menu is visible on small screens.

The simplest store is isFilterMenuVisible, which simply stores a Boolean.

The selected tags, selected project type, and search query are all similar in that they contain an `onMount` method that runs when the app mounts in the window to check for URL search params. If these are present, it updates the store to match the values of the search params. They each also have a method to handle when the user interacts with the related component, e.g., when the user clicks on a tag. This method checks whether the tag is currently in the store - if it is, it removes the value, if it is not, it adds the value. This method then calls a method to update the URL search params to match the new set of tag values.
