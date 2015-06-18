QueryBase.Views.TagsIndex = Backbone.View.extend({

  template: JST['tags/index'],
  className: 'tags-index',

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var tagsIndexContent = this.template({ tags: this.collection });
    this.$el.html(tagsIndexContent);
    this.renderMoreTags();
    return this;
  },

  renderMoreTags: function () {
    $(window).off("scroll");
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
    $(window).on("scroll", throttledCallback);
  },

  nextPage: function () {
    var view = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      if (view.collection.page_number < view.collection.total_pages) {
        view.collection.fetch({
          data: { page: view.collection.page_number + 1 },
          remove: false
        });
      }
    }
  },
});
