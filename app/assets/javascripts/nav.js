(function() {

  var $header = $('#pro').height();

  var stickSearchBar = function() {
    $(window).scroll(function() {
      if ($(this).scrollTop() > $header) {
        $('.main-nav').addClass('navbar-fixed');
        $('#intro').css('padding-top', '8.5em');
        $('.main-nav').removeClass('main-nav');
      } else {
        $('.navbar-fixed').addClass('main-nav');
        $('#intro').css('padding-top', '1em');
        $('.main-nav').removeClass('navbar-fixed');
      }
    })
  };

  var fancyScroll = function() {
    $('a[href^="#"]').on('click',function(event) {
        event.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 1500,'swing', function() {
            window.location.hash = target;
        });
    })
  };

  $(function() {
    stickSearchBar();
    fancyScroll();
  })

})();