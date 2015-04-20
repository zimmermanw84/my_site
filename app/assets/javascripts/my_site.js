var CommentModel = Backbone.Model.extend({
  validate: function(attr) {
    if( !attr.email ) {
      return 'Email Rquired!';
    }

    if ( !attr.content ) {
      return 'Comment field cannot be blank!';
    }
  },

  initialize: function() {
    this.content = this.get('content');
    this.email = this.get('email')
  }

});

var CommentsCollection = Backbone.Collection.extend({
  model: CommentModel,
    // localStorage: new Backbone.LocalStorage('Comments'),
  localStorage: [],

  url: 'comments'

});

var CommentView = Backbone.View.extend({

  tagName: 'li',

  // Super anit-pattern terrible >.<
  template: "<header> <span class='author-email'><a href='#'><%= email %></a></span>" +
      " <span class='date'><%= formatDate %></span> " +
      " <nav> [<a href='#' class='delete'>x</a>]  </nav>" +
    " </header> <div class='comment-content'> <%= content %> </div>",

  initialize: function(params) {
      if( !this.model ){
        throw new Error('You must provide a Comment model');
      };
      console.log('prams', params )
      // console.log("prams from view init", params)
      console.log("this model in view", this.model.content)
      // _.bindAll(this, 'render')
      this.listenTo( this.model, 'sync', this.render);
  },

  render: function(){
      var obj = {
        email: this.model.email,
        content: this.model.content,
        formatDate: this.model.get('created_at'),
      }
      // console.log( $('#comment-template').html() )
      var template = _.template( this.template )
      this.$el.html( template(obj) );
      // console.log("this.$el", this.$el.html() )

      return this.$el;
  },

  formatDate: function(){
      var date = this.model.get('created_at');
      return date;
  },


})

var commentsApp = Backbone.View.extend({

  initialize: function() {
    this.collection = new CommentsCollection();
    this.listenTo( this.collection, 'add', this.renderComment );
    this.listenTo( this.collection, 'add', this.renderCommentCount );
    this.collection.fetch();
    // console.log('inside commentsApp', this.collection)
  },

  events: {
    // TODO: Put update events
  },

  creatComment: function() {
    // TODO: Handle create comment event
  },

  renderComment: function(model) {
    model.view = new CommentView( { model:model } );
    $('#comment-list').prepend( model.view.render() );
    this.resetFormFields();
  },

  renderCommentCount: function() {
    var length = this.collection.length;
    var commentText = length === 1 ? ' Comment' : ' Comments';
    $('.comment-count').text( length + commentText )
  },

  resetFormFields: function() {
    this.$('form textarea, form input[name="email"]').val(null);
  },
})

$(function(){
  window.comments = new commentsApp();

});
