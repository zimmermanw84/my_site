(function() {

  commentsCollection = Backbone.Collection.extend({
    model: commentModel,
    // localStorage: new Backbone.LocalStorage('Comments')
    // TODO: Sync Comments with DB
  });

  return {
    commentsCollection: commentsCollection,
  }

})();