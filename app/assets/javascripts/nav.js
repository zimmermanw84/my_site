(function() {

  var $header = $('.rocket').height();

  var stickSearchBar = function() {
    $(window).scroll(function() {
      if ($(this).scrollTop() > $header) {
        $('.main-nav').addClass('navbar-fixed');
        $('.main-nav').removeClass('main-nav');
      } else {
        $('.navbar-fixed').addClass('main-nav');
        $('.main-nav').removeClass('navbar-fixed');
      }
    })
  };

  $(function() {
    stickSearchBar();
  })

})();