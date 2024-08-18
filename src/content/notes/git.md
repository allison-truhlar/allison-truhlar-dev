---
title: "Git"
description: "Working with Git in the command line"
pubDate: "Aug 18 2024"
heroImage: "/post_img.webp"
tags: ["reference"]
---

## I want to...

### Save my local changes to the remote repo

**Steps:**

1. `git add .` to stage all files to commit, or `git add <FILEPATH>` to stage specific files
2. `git commit -m "MESSAGE HERE` to commit the staged files with a message
3. `git push` to push the committed files to the remote repo

**Note:** at any point you can use `git status` to see what files are tracked/untracked by git and staged/unstaged

### See all branches

Local branches: `git branch`
Local + remote: `git branch -a`

### Create a new local branch that tracks a remote branch and then checkout the new local branch

`git checkout -b <new-branch-name> origin/<new-branch-name>`

### Checkout a pull request on a new local branch

`gh pr checkout <PR#>`

[Source](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/checking-out-pull-requests-locally#modifying-an-active-pull-request-locally)

### Save changes for later without committing them

Stash all changes: `git stash`
Stash specific files: `git stash push <FILEPATH>`

- **Use case:** You are working on branch A and want to make changes to branch B without creating a commit on branch A or transferring your work-in-progress over to branch B. (Creating a commit might not be desirable because your unfinished work will then be a checkpoint instead of a work in progress). Git stash saves the changes on branch A locally without making a commit. You can then recover the stashed changes when you're ready to continue working on branch A.

[Source](https://refine.dev/blog/git-stash/#what-is-git-stash)

### Retrieve stashed changes

`git stash pop`

**Note:** If you used `git stash` or `git stash push <FILEPATH>` more than once, you will need to pop each stash back in turn

### See what changes exist on an unstaged file compared to the last commit

`git diff <FILEPATH>`

### Create a new GitHub repo from local code

**Steps:**

**Part 1 - Initialize a Git repository to track your code**

1. In the terminal, `cd` to the root directory of the project
2. `git init` to intialize a Git repo from the local directory. By default, the initial branch is called `main`
3. `git add .` and `git commit -m "initial commit"` to commit your files to the local git repo.

**Part 2 - Add the local Git repository to GitHub**

1. Create a new repository on GitHub.com
2. GitHub will then give you some instructions that look like the below - copy and paste them into the terminal:
   `git remote add origin <URL TO REPO>`
   `git branch`
   `git push -u origin main`

[Source](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)
