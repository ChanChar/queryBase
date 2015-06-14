QueryBase.Views.UserIndexItem = Backbone.CompositeView.extend({

  tagName: 'li',
  className: 'user-index-item user-profile-card',
  template: JST['users/index-item'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var userIndexItemContent = this.template({ user: this.model });
    this.$el.html(userIndexItemContent);
    return this;
  },
});
