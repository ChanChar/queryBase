QueryBase.Views.NavBar = Backbone.CompositeView.extend({

  template: JST['navbar/navbar'],



  initialize: function (options) {
    this.router = options.router;
    this.questions = new QueryBase.Collections.Questions();
    this.addQuestionForm();

    this.listenTo(this.router, 'route', this.markNavActive);
  },

  events: {
    'click a.sign-out': 'signOut',
  },

  markNavActive: function (route) {
    this.$('.button.small').removeClass('active-nav');
    var routeFocus = '.' + route;
    this.$(routeFocus).addClass('active-nav');
  },

  render: function () {
    var landingContent = this.template();
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

  signOut: function (event) {
    $.ajax({
      type: "DELETE",
      url: '/session',
    });
  },

});
