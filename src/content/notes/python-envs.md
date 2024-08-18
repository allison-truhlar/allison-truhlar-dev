---
title: "Conda"
description: "Working with Conda Python environments in the command line"
pubDate: "Aug 18 2024"
heroImage: "/post_img.webp"
tags: ["reference"]
---

## I want to:

### See what environments exist on my machine:

`conda info --envs`
Or `conda env list`

### Activate/deactivate an environment

Activate: `conda activate myenvname`
Deactivate: `conda deactivate myenvname`

### Create a new environment from scratch

`conda create --name <my-env>`
Replace `<my-env>` with a name for your environment

### Create an environment from an environment.yml file

`conda env create -f environment.yml`

### Export an environment to a yml file

Activate the environment you want to export. Then type:
`conda env export > <env-name>.yml`

If you want a cross-platform compatible environment, use:
`conda env export --from-history > <env-name>.yml`

### See what packages are in an environment

If the environment is active: `conda list`

### Remove an environment

`conda env remove --name myenvname`

Unless otherwise noted, [source](https://conda.io/projects/conda/en/latest/user-guide/index.html)
