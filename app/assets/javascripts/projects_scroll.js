(function() {

  "use strict";

  var $project = $('#pro, #pro-responsive').height()

  var projectsDisplay = function() {
    $(window).scroll(function() {

      if ( $(this).scrollTop() > $project ) {

        setTimeout(function() {
          $('.smart-potato-main').addClass('animated slideInRight').show()
          $('.salty-main').addClass('animated slideInLeft').show()
        }, 500)

        setTimeout(function() {
          $('.see-need-main').addClass('animated slideInRight').show();
          $('.frack-jack-main').addClass('animated slideInLeft').show()
        }, 1500)

      }
    })
  };

  $(function() {
    $(".project-container").hide()
    projectsDisplay();
  });

})();