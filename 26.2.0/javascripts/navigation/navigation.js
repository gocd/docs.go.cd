(function() {
  var updateNavigationLink = function(linkToUpdate, possibleChoicesForNavigation) {
    for (var choiceFnIndex in possibleChoicesForNavigation) {
      var choice = possibleChoicesForNavigation[choiceFnIndex]();
      if (choice.length > 0) {
        $('.navigation-bar').css('visibility', 'visible');
        linkToUpdate.attr("href", choice.attr("href"));
        linkToUpdate.attr("aria-label", choice.text());
        linkToUpdate.attr("title", choice.text());
        linkToUpdate.css('visibility', 'visible');
        return;
      }
    }
  };

  $(document).ready(function () {
    var currentPagePermalink = $("body").data("rel-permalink");
    var currentPageLinkInMenu = $('.book-menu nav li > a[href$="' + currentPagePermalink + '"]').parent("li").first();

    var prevPageLinkElement = $(".navigation-prev");
    var nextPageLinkElement = $(".navigation-next");

    if (currentPagePermalink === "" || currentPagePermalink === "/" || currentPageLinkInMenu.length <= 0) {
      return;
    }

    updateNavigationLink(prevPageLinkElement, [
      () => currentPageLinkInMenu.prev("li").find("a[href!='#']").last(),                       // Previous sibling
      () => currentPageLinkInMenu.parents("li").first().children("a[href!='#']"),               // A parent with a link
      () => currentPageLinkInMenu.parents("li").first().prev("li").find("a[href!='#']").last(), // Last element of previous section.
    ]);

    updateNavigationLink(nextPageLinkElement, [
      () => currentPageLinkInMenu.find("li a[href!='#']").first(),                              // A child
      () => currentPageLinkInMenu.next("li").find("a[href!='#']").first(),                      // Next sibling
      () => currentPageLinkInMenu.parents("li").first().next("li").find("a[href!='#']").first() // First element of next section.
    ]);
  });
})();
