const GrayMatter = require('gray-matter');
const S = require("string");
const Markdown = require("markdown-it");
const He = require('he');
const lunr = require('lunr')

const CONTENT_PATH_PREFIX = "content";
const md = new Markdown();

function sanitizeInput(content) {
    return S(content).trim().stripTags().s;
}

module.exports = function (grunt) {

    grunt.registerTask("lunr-index", function () {

        grunt.log.writeln("Build pages index");

        const indexPages = function () {
            const pagesIndex = [];
            grunt.file.recurse(CONTENT_PATH_PREFIX, function (abspath, rootdir, subdir, filename) {
                if (!S(filename).contains("index.md")) {
                    grunt.verbose.writeln("Parse file:", abspath);
                    pagesIndex.push(processFile(abspath, filename));
                }
            });

            return pagesIndex;
        };

        const processFile = function (abspath, filename) {
            let pageIndex;

            if (S(filename).endsWith(".html")) {
                pageIndex = processHTMLFile(abspath, filename);
            } else {
                pageIndex = processMDFile(abspath, filename);
            }

            return pageIndex;
        };

        const processHTMLFile = function (abspath, filename) {
            const content = grunt.file.read(abspath);
            const pageName = S(filename).chompRight(".html").s;
            const href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).s;
            return {
                title: pageName,
                href: href,
                content: S(content).trim().stripTags().stripPunctuation().s
            };
        };

        const processMDFile = function (abspath, filename) {
            console.log("Reading from :", abspath);

            let content = grunt.file.read(abspath);
            let pageIndex;
            let frontMatter;

            try {
                // First separate the Front Matter from the content and parse it
                content = GrayMatter(content);
                frontMatter = content.data;
            } catch (e) {
                console.log(e.message);
            }

            let href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(".md").ensureRight(".html").s;
            // href for index.md files stops at the folder name
            if (S(filename).contains("index.md")) {
                href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(filename).s;
            }

            // Build Lunr index for this page
            pageIndex = {
                title: frontMatter.title,
                description: frontMatter.description,
                keywords: frontMatter.keywords,
                href: href,
                content: He.decode(sanitizeInput(md.render(sanitizeInput(content.content)))
                    .replace(/[(\n)]+/ig, ' ').trim())
            };

            return pageIndex;
        };

        const docs = indexPages();
        grunt.file.write("static/javascripts/search/lunr/PagesIndex.json", JSON.stringify({
            index: lunr(function () {
                this.use(stopWords);
                this.ref("href");
                this.field("keywords", {
                    boost: 15
                });
                this.field("title", {
                    boost: 10
                });
                this.field("description", {
                    boost: 5
                });
                this.field("content");
                this.pipeline.remove(lunr.stemmer);
                for (let i = 0; i < docs.length; ++i) {
                    this.add(docs[i]);
                }
            }),
            store: docs
        }));
        grunt.log.ok("Index built");
    });
};

function stopWords(builder) {
    // Register the pipeline function so the index can be serialised
    // lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter');

    builder.pipeline.before(lunr.stemmer, lunr.stopWordFilter);
    builder.searchPipeline.before(lunr.stemmer, lunr.stopWordFilter);
}
