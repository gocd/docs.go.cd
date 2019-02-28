$(document).ready(function(){
  $('.markdown img').on('click', function(){
    if ($(window).width() > 1020) {
      $(this).toggleClass('img-zoom');
      $('.fixed').toggleClass('fixed-bar-zindex');
   } 
  });
});
