QueryBase.Views.BadgesIndex = Backbone.CompositeView.extend({

  template: JST['badges/index'],
  className: 'badges-index',

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addBadgeView);
    this.listenTo(this.collection, 'remove', this.removeBadgeView);

    this.collection.each(this.addBadgeView.bind(this));
  },

  render: function () {
    var badgeIndexContent = this.template();
    this.$el.html(badgeIndexContent);
    this.attachSubviews();
    return this;
  },

  addBadgeView: function (badge) {
    var badgeSubview = new QueryBase.Views.BadgeIndexItem({
      model: badge
    });
    this.addSubview('.badge-index-items', badgeSubview);
  },

  removeBadgeView: function (badge) {
    this.removeSubview('.badge-index-items', badge);
  }
});
