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
    this.renderMoreUsers();
    return this;
  },

  renderMoreUsers: function () {
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
    var searchParams = $('.user-search').val();
    this.collection.search(searchParams);
    // _.debounce(usersIndexView.filterUsers(), 500);
  },

});
