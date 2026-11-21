// START: Image zoom
$(document).ready(function(){
  $('.markdown img').on('click', function(){
    if ($(window).width() > 1020) {
      $(this).toggleClass('img-zoom');
      $('.fixed').toggleClass('fixed-bar-zindex');
   }
  });
});

// START: Menu collapse
(function() {
  var collapseAllMenuItems = function() {
    $(".book-menu nav li.level1").removeClass("active").children("ul").hide();
  };

  var scrollToCurrentPageLinkInMenu = function(currentPageLink) {
    currentPageLink.scrollIntoView({block: "end"});

    var currentScrollLocation = $(".book-menu nav").scrollTop();
    $(".book-menu nav").scrollTop(currentScrollLocation + 50);
  };

  var getCurrentPageLinkInMenu = function() {
    var currentPagePermalink = $("body").data("rel-permalink");
    var permalinkToSearchFor = (currentPagePermalink === '' || currentPagePermalink === '/') ? 'href="./"' : 'href$="' + currentPagePermalink + '"';
    return $('.book-menu nav li > a[' + permalinkToSearchFor + ']').first();
  };

  var openOrCloseMenu = function(menuElement, expectedFinalActiveState) {
    if (expectedFinalActiveState) {
      menuElement.addClass("active").children("ul").show();
    } else {
      menuElement.removeClass("active").children("ul").hide();
    }
  };

  $(document).ready(function() {
    var currentPageLinkInMenu = getCurrentPageLinkInMenu();

    collapseAllMenuItems ();
    openOrCloseMenu(currentPageLinkInMenu.parents("li.level1"), true);
    scrollToCurrentPageLinkInMenu(currentPageLinkInMenu[0]);

    $('.book-menu nav li.level1.has-children > a, .book-menu nav li.level1.has-children > .menu-arrow').on('click', function(e) {
      e.stopPropagation();
      e.preventDefault();

      var menuElement = $(e.target).parents("li.level1");
      openOrCloseMenu(menuElement, !menuElement.hasClass("active"));
    });
  });
})();
