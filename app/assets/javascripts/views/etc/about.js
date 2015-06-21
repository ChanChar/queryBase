QueryBase.Views.About = Backbone.View.extend({

  template: JST['misc/about'],

  className: 'about-page',

  render: function () {
    var aboutContent = this.template();
    this.$el.html(aboutContent);
    return this;
  },

  events: {
    'click .about-get-started button': 'startTour'
  },

  startTour: function (event) {
    event.preventDefault();
    $('#reveal-about').foundation('reveal', 'close');
    Backbone.history.navigate('#', { trigger: true });
    $(document).foundation('joyride', 'start');
  }
});
