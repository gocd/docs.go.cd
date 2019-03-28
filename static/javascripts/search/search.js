let lunrIndex,
    $results,
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
    let content = $(document).find("article");
    $("#search").keyup(function () {
        $results.empty();

        const query = $(this).val();

        if (query.length < 2) {
            $(content).show();
            $(".no-results").hide();
            return;
        }

        $(content).hide();
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
    let $noResultDiv = $(".no-results");
    if (!results.length) {
        $noResultDiv.show();
        return;
    }

    $noResultDiv.hide();
    $results.append(`<h1 class="search-results-title">${results.length} results matching "${query}".</h1>`);
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
});