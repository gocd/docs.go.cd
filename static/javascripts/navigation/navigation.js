$(document).ready(function () {
    var ul = $("nav[role='navigation'] ul").eq(0);
    var currentHref = $(location).attr("href");
    var element = $('<a>', {
        href: currentHref
    });

    var pathname = element.prop('pathname');
    var allMenu = ul.find("li").find("a");
    allMenu.splice(0, 2);

    var indexOfCurrentMenu = findIndexOf(allMenu, pathname);
    var prevRef = (pathname === "/" || indexOfCurrentMenu === 0) ? null : allMenu.eq(indexOfCurrentMenu - 1);
    var nextRef = (indexOfCurrentMenu === allMenu.length - 1) ? null : allMenu.eq(indexOfCurrentMenu + 1);

    console.log(indexOfCurrentMenu);
    console.log("Previous", prevRef ? prevRef.attr("href") : null);
    console.log("Next", nextRef ? nextRef.attr("href") : null);

    updateNavigationLink($(".navigation-prev"), prevRef);
    updateNavigationLink($(".navigation-next"), nextRef);

});

function updateNavigationLink(linkToUpdate, refElem) {
    if (refElem) {
        linkToUpdate.attr("href", refElem.attr("href"));
        linkToUpdate.attr("aria-label", refElem.text());
        linkToUpdate.show();
    } else {
        linkToUpdate.hide();
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