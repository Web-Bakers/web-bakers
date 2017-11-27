# Contributing

When contributing to the [Web Bakers repository](https://github.com/Web-Bakers/web-bakers), please discuss possible changes and track your notes and progress via Github [issues](https://github.com/Web-Bakers/web-bakers/issues).  Assign yourself to any issue you are working on, whether created by you or someone else.

If you need to get the project running on your machine, first see our [setup documentation](https://github.com/Web-Bakers/web-bakers/blob/develop/SETUP.md).

# Table of Contents
1. [Pull Request Process](#pull-request-process)

## Pull Request Process

1. Make sure to update the [SETUP.md](https://github.com/Web-Bakers/web-bakers/blob/develop/SETUP.md) and [README.md](https://github.com/Web-Bakers/web-bakers/blob/develop/README.md) if your changes affect steps to setup or run the application.  Make sure to include any new environment variables/dependencies, useful file locations and any additional requirements needed to operate the app.
2. Open a pull request to the `develop` branch and let the team know via Slack - after receiving 1 approval, you may merge the PR yourself.  

### Pull - Branch - Push - PR - Merge

We are using a feature branch workflow, as defined in this [guide to using git](https://medium.com/@francesco.agnoletto/how-to-not-f-up-your-local-files-with-git-part-1-e0756c88fd3c) 

Follow this basic procedure:

- Select or create an open [issue](https://github.com/Web-Bakers/web-bakers/issues) to work on, and assign yourself to that issue.  
- Make sure your local develop branch is up to date with the remote develop branch.

    ```
    git pull
    ```
- From your updated develop branch, create a new branch for the feature or issue you are working on using the following branch naming convention: `issue/<issue #>-description-of-feature-or-bug` - for example, the branch used to write this markdown file is named `issue/48-contributing-instructions`

    - Note: new branches can be created and checked out from the command line by using the following git command:
        ```
        git checkout -b my-branch-name
        ```
- Commit your changes as you make progress, and when your feature is complete, push your branch to the remote repository.

    ```
    git push origin my-branch-name
    ```
- Go to the [pull requests](https://github.com/Web-Bakers/web-bakers/pulls) page in the Web Bakers repo and create a new pull request.  Select `develop` as the base branch, and your feature branch from the `compare` dropdown menu. 
- Once your PR is created, request reviews from collaborators by using the `Reviewers` feature on the PR page.  Post a message or link to your PR in the Web Bakers Slack channel as well, so that other contributors will know about your pending PR.
- When your PR receives a single approval, you can merge it into develop.
- After merging your PR, close the related issue.

Note: Changes to the master branch will occur only after major feature integrations, and require approval from the entire Web Bakers team before merging.

Last updated: 11/25/2017