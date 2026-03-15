const fs = require('node:fs');
const path = require('node:path');

const GrayMatter = require('gray-matter');
const Markdown = require('markdown-it');
const He = require('he');
const lunr = require('lunr');

const CONTENT_PATH_PREFIX = 'content';
const OUTPUT_PATH = path.join('static', 'javascripts', 'search', 'lunr', 'PagesIndex.json');
const md = new Markdown();

function removePrefix(value, prefix) {
    return value.startsWith(prefix) ? value.slice(prefix.length) : value;
}

function removeSuffix(value, suffix) {
    return value.endsWith(suffix) ? value.slice(0, -suffix.length) : value;
}

function ensureSuffix(value, suffix) {
    return value.endsWith(suffix) ? value : `${value}${suffix}`;
}

function stripTags(value) {
    return String(value).replace(/<[^>]*>/g, '');
}

function stripPunctuation(value) {
    return String(value).replace(/[\p{P}\p{S}]/gu, '');
}

function sanitizeInput(content) {
    return stripTags(String(content)).trim();
}

function toPosixRelativeFromRoot(absolutePath) {
    return path.relative(process.cwd(), absolutePath).split(path.sep).join('/');
}

function walkFiles(startDir) {
    const files = [];
    const entries = fs.readdirSync(startDir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(startDir, entry.name);
        if (entry.isDirectory()) {
            files.push(...walkFiles(fullPath));
            continue;
        }
        files.push(fullPath);
    }

    return files;
}

function processHTMLFile(relativePath, filename) {
    const content = fs.readFileSync(relativePath, 'utf8');
    const pageName = removeSuffix(filename, '.html');
    const href = removePrefix(relativePath, CONTENT_PATH_PREFIX);

    return {
        title: pageName,
        href,
        content: stripPunctuation(stripTags(content).trim())
    };
}

function processMDFile(relativePath, filename) {
    console.log('Reading from :', relativePath);

    let content = fs.readFileSync(relativePath, 'utf8');
    let frontMatter = {};

    try {
        content = GrayMatter(content);
        frontMatter = content.data;
    } catch (e) {
        console.log(e.message);
    }

    let href = ensureSuffix(removeSuffix(removePrefix(relativePath, CONTENT_PATH_PREFIX), '.md'), '.html');

    if (filename.includes('index.md')) {
        href = removeSuffix(removePrefix(relativePath, CONTENT_PATH_PREFIX), filename);
    }

    return {
        title: frontMatter.title,
        description: frontMatter.description,
        keywords: frontMatter.keywords,
        href,
        content: He.decode(
          sanitizeInput(md.render(sanitizeInput(content.content))).replace(/[(\n)]+/gi, ' ').trim()
        )
    };
}

function processFile(relativePath) {
    const filename = path.basename(relativePath);

    if (filename.endsWith('.html')) {
        return processHTMLFile(relativePath, filename);
    }
    return processMDFile(relativePath, filename);
}

function indexPages() {
    const pagesIndex = [];
    const contentDir = path.join(process.cwd(), CONTENT_PATH_PREFIX);
    const allFiles = walkFiles(contentDir);

    for (const absoluteFile of allFiles) {
        const relativePath = toPosixRelativeFromRoot(absoluteFile);
        const filename = path.basename(relativePath);

        if (!filename.includes('index.md')) {
            pagesIndex.push(processFile(relativePath));
        }
    }

    return pagesIndex;
}

function stopWords(builder) {
    builder.pipeline.before(lunr.stemmer, lunr.stopWordFilter);
    builder.searchPipeline.before(lunr.stemmer, lunr.stopWordFilter);
}

function buildIndex(docs) {
    return lunr(function build() {
        this.use(stopWords);
        this.ref('href');
        this.field('keywords', { boost: 15 });
        this.field('title', { boost: 10 });
        this.field('description', { boost: 5 });
        this.field('content');
        this.pipeline.remove(lunr.stemmer);

        for (const doc of docs) {
            this.add(doc);
        }
    });
}

function main() {
    console.log('Build pages index');
    const docs = indexPages();
    const payload = JSON.stringify({
        index: buildIndex(docs),
        store: docs
    });

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, payload, 'utf8');
    console.log('Index built');
}

main();
