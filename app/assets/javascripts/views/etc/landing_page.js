QueryBase.Views.Landing = Backbone.View.extend({

  tagName: 'div',
  className: 'container landing-page',
  template: JST['landing/landing_page'],

  render: function () {
    var landingContent = this.template();
    this.$el.html(landingContent);
    return this;
  },
});
