var lunrIndex,
    $results,
    pagesIndex;

function getVersion() {
    var pageURL = $(location).attr("href");
    if (pageURL.indexOf("localhost:1313") >= 0) {
        return "";
    }
    var element = $('<a>', {
        href: pageURL
    });
    return "/" + element.prop('pathname').split("/")[1];
}

function initLunr() {
    let indexJsonPath = window.location.origin + `${getVersion()}/javascripts/search/lunr/PagesIndex.json`;
    $.getJSON(indexJsonPath)
        .done(function (index) {
            pagesIndex = index;
            lunrIndex = lunr(function () {
                this.field("title", {
                    boost: 10
                });
                this.field("tags", {
                    boost: 5
                });
                this.field("content");

                this.ref("href");
                for (var i = 0; i < pagesIndex.length; ++i) {
                    this.add(pagesIndex[i]);
                }
            });
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Error getting Hugo index file:", err);
        });
}

function initUI() {
    $results = $("#results");
    content = $(document).find("article");
    $("#search").keyup(function () {
        $results.empty();

        var query = $(this).val();

        if (query.length < 2) {
            $(content).show();
            $(".no-results").hide();
            return;
        }

        $(content).hide();
        var results = search(query);

        renderResults(results);
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

function renderResults(results) {
    let $noResultDiv = $(".no-results");
    if (!results.length) {
        $noResultDiv.show();
        return;
    }

    $noResultDiv.hide();
    results.slice(0, 20).forEach(function (result) {
        var $result = $("<li>");
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