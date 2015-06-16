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

  renderSearchResults: function (users) {
    var usersIndexContent = this.template();
    this.collection.each(this.removeUserView.bind(this));
    users.forEach(this.addUserView.bind(this));
    this.attachSubviews();
    return this;
  },

  events: {
    'keyup .user-search': 'searchUsers',
  },

  addUserView: function (user) {
    var userSubview = new QueryBase.Views.UserIndexItem({
      model: user
    });
    this.addSubview('.user-index-items', userSubview);
  },

  removeUserView: function (user) {
    this.removeModelSubview('.user-index-items', user);
  },

  searchUsers: function(event) {
    var usersIndexView = this;
    _.debounce(usersIndexView.filterUsers(), 500);
  },

  filterUsers: function () {
    var searchParams = new RegExp($('.user-search').val(), 'gi'); // g=global, i=case insensitive
    var foundUsers = this.collection.filter(function (user) {
      return searchParams.test(user.get('username'));
    });

    this.renderSearchResults(foundUsers);
  }

});
