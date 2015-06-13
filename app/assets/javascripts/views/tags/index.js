QueryBase.Views.TagsIndex = Backbone.View.extend({

  template: JST['tags/index'],
  className: 'tags-index',

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var tagsIndexContent = this.template({ tags: this.collection });
    this.$el.html(tagsIndexContent);
    return this;
  },
});
