(function() {

  commentsCollection = Backbone.Collection.extend({
    model: commentModel,
    // localStorage: new Backbone.LocalStorage('Comments')
  });

  return {
    commentsCollection: commentsCollection,
  }

})();