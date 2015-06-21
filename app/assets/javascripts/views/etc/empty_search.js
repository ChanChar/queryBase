QueryBase.Views.EmptySearch = Backbone.View.extend({

  template: JST['misc/empty_search'],

  render: function () {
    var emptyMessageContent = this.template();
    this.$el.html(emptyMessageContent);
    return this;
  },
});
