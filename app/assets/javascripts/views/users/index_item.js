QueryBase.Views.UserIndexItem = Backbone.CompositeView.extend({

  tagName: 'li',
  className: 'user-index-item user-profile-card',
  template: JST['users/index-item'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .user-info': 'showUser',
    // 'mouseenter .user-badges': 'toggleHighlightBadges',
    // 'mouseleave .user-badges': 'toggleHighlightBadges'
  },

  render: function () {
    var userIndexItemContent = this.template({ user: this.model });
    this.$el.html(userIndexItemContent);
    return this;
  },

  showUser: function (event) {
    event.preventDefault();
    var userUrl = 'users/' + this.model.id;
    Backbone.history.navigate(userUrl, { trigger: true });
  },

  // toggleHighlightBadges: function () {
    // var badges = this.$('.user-badges img');
    // badges.toggleClass('badge-highlight');
  // },

});
