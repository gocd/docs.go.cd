$(document).ready(function () {
    var pathname = getPathname();
    var ul = $("nav[role='navigation'] ul").eq(0);

    var allMenu = ul.find("li").find("a");
    allMenu.splice(0, 2);

    var indexOfCurrentMenu = findIndexOf(allMenu, pathname);
    var prevRef = (pathname === "/" || indexOfCurrentMenu === 0) ? null : allMenu.eq(indexOfCurrentMenu - 1);
    var nextRef = (indexOfCurrentMenu === allMenu.length - 1) ? null : allMenu.eq(indexOfCurrentMenu + 1);

    updateNavigationLink($(".navigation-prev"), prevRef);
    updateNavigationLink($(".navigation-next"), nextRef);

});

function getPathname() {
    var currentHref = $(location).attr("href");
    var element = $('<a>', {
        href: currentHref
    });

    var pathname = element.prop('pathname');
    if (currentHref.indexOf("localhost:1313") >= 0) {
        return pathname;
    }
    return pathname.replace("/" + element.prop('pathname').split("/")[1], "")
}

function updateNavigationLink(linkToUpdate, refElem) {
    if (refElem) {
        linkToUpdate.attr("href", refElem.attr("href"));
        linkToUpdate.attr("aria-label", refElem.text());
        linkToUpdate.css('visibility', 'visible');
    } else {
        linkToUpdate.css('visibility', 'hidden');
    }
}

function findIndexOf(list, pathToFind) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].getAttribute("href").indexOf(pathToFind) !== -1) {
            return i;
        }
    }
    return -1;
}