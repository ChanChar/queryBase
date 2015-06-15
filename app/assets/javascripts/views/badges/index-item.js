QueryBase.Views.BadgeIndexItem = Backbone.View.extend({

  template: JST['badges/index-item'],
  className: 'badge-index-item',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var badgeIndexItemContent = this.template({
      badge: this.model
    });
    this.$el.html(badgeIndexItemContent);
    return this;
  },
});
