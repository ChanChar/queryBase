QueryBase.Views.NavBar = Backbone.CompositeView.extend({

  template: JST['navbar/navbar'],

  initialize: function (options) {
    this.router = options.router;
    this.questions = new QueryBase.Collections.Questions();

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.router, 'route', this.markNavActive);

    this.addQuestionForm();
    this.addAboutView();
  },

  events: {
    'click a.sign-out': 'signOut',
    'click a.show-question-form': 'revealQuestionForm',
    'click li.show-about-button': 'revealAbout',
    'click .navbar-logo': 'redirectHome',
  },

  markNavActive: function (route) {
    this.$('.button.small').removeClass('active-nav');
    var routeFocus = '.' + route;
    this.$(routeFocus).addClass('active-nav');
  },

  render: function () {
    var landingContent = this.template({ user: this.model });
    this.$el.html(landingContent);
    this.attachSubviews();
    return this;
  },

  addQuestionForm: function () {
    this.questions.fetch();
    var newQuestion = new QueryBase.Models.Question();
    var questionNewView = new QueryBase.Views.QuestionNew({
      model: newQuestion, collection: this.questions
    });

    this.addSubview('#reveal-question-form', questionNewView);
  },

  addAboutView: function () {
    var aboutView = new QueryBase.Views.About();
    this.addSubview('#reveal-about', aboutView);
  },

  revealAbout: function (event) {
    event.preventDefault();
    this.$('#reveal-about').foundation('reveal', 'open');
  },

  revealQuestionForm: function (event) {
    event.preventDefault();
    this.$('#reveal-question-form').foundation('reveal', 'open');
  },

  signOut: function (event) {
    $.ajax({
      type: "DELETE",
      url: '/session',
    });
  },

  redirectHome: function (event) {
    event.preventDefault();
    Backbone.history.navigate('#', { trigger: true });
  }
});
