QueryBase.Views.CommentShow = Backbone.View.extend({

  template: JST['comments/show'],

  tagName: 'comment',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var commentContent = this.template({ comment: this.model });
    this.$el.html(commentContent);
    return this;
  },
});
