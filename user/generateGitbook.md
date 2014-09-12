# Steps to generate gitbook:

- You should have gitbook [setup](https://github.com/GitbookIO/gitbook#how-to-use-it) for generating the gitbook
- Run the following command in the repo to generate the static website:
```
$ gitbook build path_to_repository --output=path_to_output_folder

example (if you are in the repository): gitbook build .
```
- Copy the contents of _book to some place
- Change the repository branch to gh-pages
- Overwrite the contents with the generated gitbook and push upstream
