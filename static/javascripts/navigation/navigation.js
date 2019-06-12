(function() {
  var updateNavigationLink = function(linkToUpdate, refElem) {
    if (refElem.length > 0) {
      linkToUpdate.attr("href", refElem.attr("href"));
      linkToUpdate.attr("aria-label", refElem.text());
      linkToUpdate.css('visibility', 'visible');
    }
  };

  $(document).ready(function () {
    var currentPagePermalink = $("body").data("rel-permalink");
    var currentPageLinksInMenu = $('.book-menu nav li > a[href$="' + currentPagePermalink + '"]');

    var prevPageLinkElement = $(".navigation-prev").css('visibility', 'hidden');
    var nextPageLinkElement = $(".navigation-next").css('visibility', 'hidden');

    if (currentPagePermalink === "" || currentPagePermalink === "/" || currentPageLinksInMenu.length <= 0) {
      return;
    }

    updateNavigationLink(prevPageLinkElement, currentPageLinksInMenu.parent("li").prev("li").find("a"));
    updateNavigationLink(nextPageLinkElement, currentPageLinksInMenu.parent("li").next("li").find("a"));
  });
})();
