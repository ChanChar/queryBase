QueryBase.Views.UsersIndex = Backbone.CompositeView.extend({

  className: 'users-index row',
  template: JST['users/index'],

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addUserView);
    this.listenTo(this.collection, 'remove', this.removeUserView);
    this.collection.each(this.addUserView.bind(this));
  },

  render: function () {
    var usersIndexContent = this.template();
    this.$el.html(usersIndexContent);
    this.attachSubviews();
    return this;
  },

  addUserView: function (user) {
    var userSubview = new QueryBase.Views.UserIndexItem({ model: user });
    this.addSubview('.user-index-items', userSubview);
  },

  removeUserView: function (user) {
    this.removeSubview('.user-index-items', user);
  }
});
