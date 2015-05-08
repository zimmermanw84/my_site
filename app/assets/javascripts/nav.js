(function() {

  var stickySearchBar = (function() {

  var $header = $('header').height();

  var stickSearchBar = function() {
    $(window).scroll(function() {
      if ($(this).scrollTop() > $header) {
        $('.nav-landing').show();
        $('.nav-landing').addClass('animated slideInDown');
      } else {
        $('.nav-landing').hide();
      }
    })
  };

  var init = function() {
    stickSearchBar();
  };

  return {
    init:init,
  };
})();

stickySearchBar.init();



  $(function() {

  })

})();