(function() {

  commentModel = Backbone.Model.extend({
    validate: function(attr) {
      if( !attr.email ) {
        return 'Email Rquired!';
      }

      if ( !attr.content ) {
        return 'Comment field cannot be blank!';
      }
    }
  });

  return {
    commentModel:commentModel,
  }

})();