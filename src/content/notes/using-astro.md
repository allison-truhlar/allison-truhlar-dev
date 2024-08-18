---
title: "Getting started with Astro"
description: "Set up a project and learn about content collections"
pubDate: "Aug 18 2024"
heroImage: "/post_img.webp"
tags: ["Astro"]
---

# Start an Astro project

1. Run this command anywhere on your machine - the set up wizard will create an empty directory for you in the first step.

```
npm create astro@latest
```

Optionally, you can create a project using a [template](https://astro.build/themes/) by passing the template flag and the GitHub user and repo for the template.

```
npm create astro@latest -- --template <github-username>/<github-repo>
```

2. Procees through the set-up wizard steps - it's recommended you install all the dependencies.
3. Once the set up is complete, navigate to the directory created by the wizard and run this command to preview your project.

```
npm run dev
```

# Content collections

Any top-level directory inside `src/content`, e.g., `src/content/blog`. A collection entry is any file stored in a content collection directory. A collection entry must be in `.md`, `.mdx.`, `.yaml`, or `.json` format.

The advantages to using collections include:

- [Validate of frontmatter](https://docs.astro.build/en/guides/content-collections/#defining-a-collection-schema). This requires defining your content collections in a `src/content/config.ts` file.
- [Define Typescript datatypes for frontmatter](https://docs.astro.build/en/guides/content-collections/#defining-datatypes-with-zod). This requires a `src/content/config.ts` file and the use of Zod.
- Use Astro's utilities for querying content collections and their entries, `getCollection()` and `getEntry()`, to easily populate content on pages.
- Reference related content entries. For example, each `software-ecosystem` entry can have a `project` property which consists of an array of entries from the `projects` collection, referenced by each project's unique `slug`. Then you can easily access data from the related projects on each `software-ecosystem` entry's page.
