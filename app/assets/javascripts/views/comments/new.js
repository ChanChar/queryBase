QueryBase.Views.CommentForm = Backbone.View.extend({

  template: JST['comments/new'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var newCommentContent = this.template({ model: this.model });
    this.$el.html(newCommentContent);
    return this;
  },

});
