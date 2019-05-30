const enumValue = (name) => Object.freeze({toString: () => name});

const SearchStatus = Object.freeze({
    init: enumValue("init"),
    noResults: enumValue("empty"),
    publishResults: enumValue("results")
});

let lunrIndex,
    $results,
    $searchResultTitle,
    $content,
    $noResultDiv,
    pagesIndex;

function getVersion() {
    const pageURL = $(location).attr("href");
    if (pageURL.indexOf("localhost:1313") >= 0) {
        return "";
    }
    let element = $('<a>', {
        href: pageURL
    });
    return "/" + element.prop('pathname').split("/")[1];
}

function initLunr() {
    let indexJsonPath = window.location.origin + `${getVersion()}/javascripts/search/lunr/PagesIndex.json`;
    $.getJSON(indexJsonPath)
        .done(function (index) {
            pagesIndex = index.store;
            lunrIndex = lunr.Index.load(index.index);
        })
        .fail(function (jqxhr, textStatus, error) {
            let err = textStatus + ", " + error;
            console.error("Error getting Hugo index file:", err);
        });
}

function initUI() {
    $results = $("#results");
    $searchResultTitle = $("#searchResultTitle");
    $noResultDiv = $(".no-results");
    $content = $(document).find("article");

    searchUI(SearchStatus.init);

    $("#search").keyup(function () {

        const query = $(this).val();

        if (query.length < 2) {
            searchUI(SearchStatus.init);
            return;
        }

        const results = search(query);
        renderResults(query, results);
    });
}

function search(query) {
    let searchResults = doSearch(query);
    if (searchResults.length === 0) {
        let partialMatchQuery = query + "*";
        return doSearch(partialMatchQuery);
    }
    return searchResults;
}

function doSearch(searchQuery) {
    return lunrIndex.search(searchQuery).map(function (result) {
        return pagesIndex.filter(function (page) {
            return page.href === result.ref;
        })[0];
    });
}

function renderResults(query, results) {
    if (!results.length) {
        searchUI(SearchStatus.noResults);
        return;
    }
    searchUI(SearchStatus.publishResults, `${results.length} results matching : <span class="search-query">${query}</span>`);
    results.slice(0, 20).forEach(function (result) {
        let $result = $("<li>");
        $result.append($("<a>", {
            href: getVersion() + result.href,
            text: "» " + result.title
        }));
        $result.append($("<div>" + result.content.slice(0, 500) + "..." + "</div>"));
        $results.append($result);
    });
}

initLunr();

$(document).ready(function () {
    initUI();
    anchoriseHeaders();
});

function searchUI(searchStatus, searchTitle) {
    $results.empty();
    switch (searchStatus) {
        default:
        case SearchStatus.init:
            $content.show();
            $searchResultTitle.hide();
            break;
        case SearchStatus.noResults:
            $content.hide();
            $noResultDiv.show();
            $searchResultTitle.hide();
            break;
        case SearchStatus.publishResults:
            $content.hide();
            $noResultDiv.hide();
            $searchResultTitle.show();
            $searchResultTitle.html(searchTitle);
            break;
    }
}

function anchoriseHeaders() {
    for (let level = 1; level <= 6; level++) {
        const headers = document.getElementsByTagName("h" + level);
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const id = header.id;
            if (id.indexOf("searchResultTitle") < 0) {   // the search result title doesn't need anchor
                header.appendChild(anchorForId(id));
            }
        }
    }
}

function anchorForId(id) {
    // const link = document.createElement("i");
    // link.className = "fa fa-link";
    // link.setAttribute("aria-hidden", "true");

    const link = document.createElement("img");
    link.setAttribute("src", window.location.origin + "/images/link.png");

    const anchor = document.createElement("a");
    anchor.className = "header-anchor";
    anchor.href = "#" + id;
    anchor.appendChild(link);

    return anchor;
}