---
title: "Today I Learned"
description: "My daily learnings as a new dev"
pubDate: "Aug 27 2024"
updatedDate: "Aug 27 2024"
heroImage: "/post_img.webp"
tags: ["Learning in public"]
---

### Aug 27, 2024

Today I learned about using aliases in Astro to create shortcuts for imports. This is in place of using relative paths for imports. For example:

```JS
import Button from '../../components/Button.atro' # Relative path
import Button from '@components/Button.astro' # Aliased path
```

If you have many relative imports in your codebase, using aliases can make the code more readable. It can also make the code more maintable - if a file using relative paths is moved, the imports break, while the imports will still be valid in a file using aliases. 

You add import aliases in `tsconfig.json`:

```TS
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"]
    }
  }
}
```
**Important:** The `baseUrl` must be set for the aliased paths to resolve correctly.