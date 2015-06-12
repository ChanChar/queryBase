QueryBase.Views.UserShow = Backbone.View.extend({

  template: JST['users/show'],
  className: 'user-page',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var userContent = this.template({ user: this.model });
    this.$el.html(userContent);
    return this;
  },
});
