QueryBase.Views.CommentForm = Backbone.View.extend({

  template: JST['comments/new'],

  tagName: 'form',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var newCommentContent = this.template({ question: this.model });
    this.$el.html(newCommentContent);
    return this;
  },

});
