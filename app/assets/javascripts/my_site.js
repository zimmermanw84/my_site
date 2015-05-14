(function() {

  "use strict";

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
    // the time will come when comments have to be deleted or break down and make an admin UI
    // " <nav> [<a href='#' class='delete'>x</a>]  </nav>" +
    " </header> <div class='comment-content'> <%= content %> </div>",

    events: {
      'click .delete': 'destroy',
    },

    initialize: function(params) {
      if( !this.model ){
        throw new Error('You must provide a Comment model');
      };
      this.$el.attr( "class", "list-group-item" );
      this.listenTo( this.model, 'remove', this.remove );
      this.listenTo( this.model, 'sync', this.render );
    },

    render: function(){
      var commentInfo = {
        email: this.model.email,
        content: this.model.content,
        formatDate: this.model.get('created_at'),
      }

      var template = _.template( this.template )
      this.$el.html( template(commentInfo) );

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


  var commentsApp = Backbone.View.extend({

    el: $('.comments'),

    initialize: function() {
      this.collection = new CommentsCollection();

      this.listenTo( this.collection, 'add', this.renderComment );
      this.listenTo( this.collection, 'add', this.renderCommentCount );

      this.collection.fetch();
    },

    events: {
      'submit form': 'createComment',
    },

    createComment: function(event) {
      event.preventDefault();
      // Create a new Comment Model with the data in the form
      var comment = {
        content: this.$('form textarea').val(),
        email: this.$('#user-email').data('email'),
        created_at: +new Date()
      };
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
    browserid.onLogin = function(data) {
      window.location.reload();
    }
    browserid.onLogout = function(data) {
      window.location.reload();
    }

    // bootstrap modal fix
    // Mobile Modal fix
    $('.modal-dialog').css('display', 'none')

    $('.project-container, #connect-trigger').on('click', function() {
      if ( $('.modal-dialog').css('display') === 'none' ) {
        $('.modal-dialog').css('display', 'block')
      }
    });

    $('.close').on('click', function() {
      if ( $('.modal-dialog').css('display') === 'block' ) {
        $('.modal-dialog').css('display', 'none')
      }
    });

  });

})();