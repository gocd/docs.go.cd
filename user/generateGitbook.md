# Steps to generate gitbook:

Though it's highly appreciated, it is not necessary to generate gitbook as a part of your contribution towards improving the [user documentation](http://www.go.cd/documentation/user/current/).

You should have [setup](https://github.com/GitbookIO/gitbook#gitbook) for generating the gitbook. Please follow below steps to send a pull request for the gitbook changes:

- Test your changes in the gitbook. 
    - To see your changes in the gitbook run the following command in the user folder of the documentation repository:
        `$ gitbook serve`
    - Open a browser and test your gibook at `http://localhost:4000/`

- If the changes look good, run the following command (in the user folder of the documentation repository) to generate the static website:

```
    $ gitbook build path_to_repository --output=path_to_output_folder
    
    For example (if you are inside the user folder of the repository): 
        $ gitbook build .
```
- The contents of _book is what needs to be pushed to the *[gh-pages](https://github.com/gocd/documentation/tree/gh-pages/user)* branch of user repository.
- Change the branch to *gh-pages*.
    - If you haven't pulled *gh-pages* branch before, run the following command:
    ```
        $ git fetch origin gh-pages
        $ git checkout gh-pages
    ```
    - However, if you had fetched the remote branch before, you just need to checkout that branch;
    `$ git checkout gh-pages`
- Now update the content of the folder (document version) with the previously generated book content on *gh-pages* branch. The easiest way would be to replace the older content with the generated book and let git detect the changes.
- Make a commit and then send a pull request to *gh-pages* branch.
