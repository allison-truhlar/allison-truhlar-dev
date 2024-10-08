---
title: "How to implement keyword search for Astro content collections with FuseJS"
description: "A method using a statically generated endpoint and Nano Stores."
pubDate: "Aug 18 2024"
heroImage: "/post_img.webp"
badge: "Demo badge"
tags: ["astro"]
---

Keyword search was built using the FuseJS package and relies on a couple of features of Astro and Nano Stores.

## FuseJS

FuseJS is a popular fuzzy-search library with zero dependencies. It can be used solely client-side. Picked because it was straightforward to set it up two different Fuse instances - one to index projects and one to index ecosystems. Other search options like Pagefind, which is used as the search tool in the Astro Starlight documentation theme, did not seem as easy to create multiple indexes. To use Fuse, the basic steps are to pass it an array of objects to include in the search, and an options array that indicates what object key values to include the search, along with other search options defined in the Fuse documentation.

## Astro endpoints

In statically-generated Astro endpoints (as opposed to ones generated with on-demand/server-side rendering (SSR)), the data is created at build time. For example, `src/pages/projects.json.js` builds a `/projects.json` endpoint. Astro calls the `GET` function found in `src/pages/projects.json.js` at build time, and generates the JSON file using the Response object returned by this function.

In the case of `/projects.json`, the JSON file contains a pre-built Fuse index. This means the index does not need to be regenerated by Fuse every time a search is executed - the pre-built index is fetched then parsed by Fuse. The code to build this index takes advantage of Astro's content collections and the `getCollection()` utility.

## Executing the search and computed Nano Stores

I again used Nano Stores to manage state for both the search query in the search input and the search results. The search query needed to be accessed by both the search input component and the project card components. The search results needed to be accessed by both the project card components and the project count component.

The `projectData` or `ecosystemData`, which contain the search results, depends on the value of the `urlQuery`, as well as the parsed Fuse index. I therefore used the `computed()` Nano Store method to update `projectData` and `ecosystemData` whenever either the `urlQuery` or Fuse index is updated. This is similar to `useEffect()` in React. It is the `projectData` and `ecosystemData` stores that conduct the search using the `urlQuery` and the Fuse index - the returned results are stored as `projectData` or `ecosystemData`. This is then used by the project cards to determine which should be shown as a user types into the search input.
