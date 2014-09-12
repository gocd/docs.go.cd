# Steps to generate gitbook:

- Run the following command in the repo to generate the static website:
```
$ gitbook build path_to_repository --output=path_to_output_folder

example: gitbook build . 
```
- Copy the contents of _book to some place
- Change the repository branch to gh-pages
- Overwrite the contents with the generated gitbook
