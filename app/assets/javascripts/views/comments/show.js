QueryBase.Views.CommentShow = Backbone.View.extend({

  template: JST['comments/show'],

  className: 'comment',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .comment-delete-link': 'deleteComment'
  },

  render: function () {
    var commentContent = this.template({ comment: this.model });
    this.$el.html(commentContent);
    return this;
  },

  deleteComment: function (event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  }
});
