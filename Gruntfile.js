var yaml = require("yamljs");
var S = require("string");

var CONTENT_PATH_PREFIX = "content";

module.exports = function (grunt) {

    grunt.registerTask("lunr-index", function () {

        grunt.log.writeln("Build pages index");

        var indexPages = function () {
            var pagesIndex = [];
            grunt.file.recurse(CONTENT_PATH_PREFIX, function (abspath, rootdir, subdir, filename) {
                if (!S(filename).contains("index.md")) {
                    grunt.verbose.writeln("Parse file:", abspath);
                    pagesIndex.push(processFile(abspath, filename));
                }
            });

            return pagesIndex;
        };

        var processFile = function (abspath, filename) {
            var pageIndex;

            if (S(filename).endsWith(".html")) {
                pageIndex = processHTMLFile(abspath, filename);
            } else {
                pageIndex = processMDFile(abspath, filename);
            }

            return pageIndex;
        };

        var processHTMLFile = function (abspath, filename) {
            var content = grunt.file.read(abspath);
            var pageName = S(filename).chompRight(".html").s;
            var href = S(abspath)
                .chompLeft(CONTENT_PATH_PREFIX).s;
            return {
                title: pageName,
                href: href,
                content: S(content).trim().stripTags().stripPunctuation().s
            };
        };

        var processMDFile = function (abspath, filename) {
            console.log("Reading from :", abspath);

            var content = grunt.file.read(abspath);
            var pageIndex;
            // First separate the Front Matter from the content and parse it
            content = content.split("---");
            var frontMatter;
            try {
                frontMatter = yaml.parse(content[1].trim());
            } catch (e) {
                console.log(e.message);
            }

            var href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(".md").ensureRight(".html").s;
            // href for index.md files stops at the folder name
            if (filename === "index.md") {
                href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(filename).ensureRight(".html").s;
            }

            // Build Lunr index for this page
            pageIndex = {
                title: frontMatter.title,
                tags: frontMatter.tags,
                href: href,
                content: S(content[2]).trim().stripTags().stripPunctuation().s
            };

            return pageIndex;
        };

        grunt.file.write("static/javascripts/search/lunr/PagesIndex.json", JSON.stringify(indexPages()));
        grunt.log.ok("Index built");
    });
};