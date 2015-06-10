QueryBase.Views.NavBar = Backbone.View.extend({

  template: JST['navbar/navbar'],

  render: function () {
    var landingContent = this.template();
    this.$el.html(landingContent);
    return this;
  },

});
