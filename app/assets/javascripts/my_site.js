var CommentModel = Backbone.Model.extend({
  validate: function(attr) {
    if( !attr.email ) {
      alert('Email Required!');
      return;
    }

    if ( !attr.content ) {
      alert('Comment field cannot be blank!');
      return;
    }
  },

  initialize: function() {
    this.content = this.get('content');
    this.email = this.get('email')
  }

});

var CommentsCollection = Backbone.Collection.extend({
  model: CommentModel,

  localStorage: [],

  url: '/comments'

});

var CommentView = Backbone.View.extend({

  tagName: 'li',

  // Super anit-pattern terrible >.<
  template: "<header> <span class='author-email'><a href='#'><%= email %></a></span>" +
  " <span class='date'><%= formatDate %></span> " +
  " <nav> [<a href='#' class='delete'>x</a>]  </nav>" +
  " </header> <div class='comment-content'> <%= content %> </div>",

  events: {
    'click .delete': 'destroy',
  },

  initialize: function(params) {
    if( !this.model ){
      throw new Error('You must provide a Comment model');
    };
    this.$el.attr( "class", "list-group-item" );
    this.listenTo( this.model, 'remove', this.remove);
    this.listenTo( this.model, 'sync', this.render);
  },

  render: function(){
    var obj = {
      email: this.model.email,
      content: this.model.content,
      formatDate: this.model.get('created_at'),
    }

    var template = _.template( this.template )
    this.$el.html( template(obj) );

    return this.$el;
  },

  destroy: function(event){
    event.preventDefault();
    this.model.destroy();
  },

  formatDate: function(){
    var date = this.model.get('created_at');
    return date;
  },


});

var BrowserId = Backbone.Model.extend({

  url: '/login',

  initialize: function(){
    navigator.id.watch({
      onlogin: this.onlogin.bind(this),
      onlogout: this.onlogout.bind(this)
    });
  },

  onlogin: function(assertion){
    var data = {
      assertion: assertion
    };

    this.fetch({ data: data });
    // console.log('assertion', assertion )
  },

  onlogout: function(){

  },

  sync: function(method, model, options){
    var params = {
      url: this.url,
      type: 'post',
      // xhrFields: { withCredentials: true }
    };
    console.log('inside sync')
    return $.ajax( _.extend(params, options) );
  }

});

var commentsApp = Backbone.View.extend({

  el: $('.comments'),

  initialize: function() {
    // this.browserId = new BrowserId();
    this.collection = new CommentsCollection();

    this.listenTo( this.collection, 'add', this.renderComment );
    this.listenTo( this.collection, 'add', this.renderCommentCount );
    // this.listenTo( this.browserId, 'sync', this.renderBrowserId );

    this.collection.fetch();
  },

  events: {
    'submit form': 'createComment',
    // 'click .sign-in': 'createPersona',
    // 'click .logout': 'logout'
  },

  createComment: function(event) {
    event.preventDefault();
    // Create a new Comment Model with the data in the form
    var comment = {
      content: this.$('form textarea').val(),
      // TODO: Add Persona
      // email: this.browserId.get('email'),
      email: this.$('#user-email').data('email'),
      created_at: +new Date()
    };
    console.log(comment)
      // The `validate` option ensures that empty comments aren't added
      this.collection.create( comment, { validate: true });

    },

    renderComment: function(model) {
      if (!model.content) return;
      model.view = new CommentView( { model:model } );
      this.$('#comment-list').prepend( model.view.render() );
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

});

$(function(){
  window.comments = new commentsApp();

  browserid.onLogin = function(data, status, xhr) {
    window.location.reload();
  }

  browserid.onLogout = function(data) {
    navigator.id.logout();
    window.location.reload();
  }

});
