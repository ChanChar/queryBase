QueryBase.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.questions = new QueryBase.Collections.Questions();
  },

  routes: {
    // '': 'landing',

    '': 'questionIndex',
    'questions/new': 'questionNew',
    'questions/:id': 'questionShow',
    'questions/:id/edit': 'questionEdit',

    'users': 'usersIndex',
    'users/:id': 'userShow',
    'users/:id/edit': 'userEdit'

  },

  landing: function () {
    var landingView = new QueryBase.Views.Landing();
    this._swapView(landingView);
  },

  questionIndex: function () {
    this.questions.fetch();
    var questionIndexView = new QueryBase.Views.QuestionsIndex({
      collection: this.questions
    });
    this._swapView(questionIndexView);
  },

  questionNew: function () {
    var newQuestion = new QueryBase.Models.Question();
    var questionNewView = new QueryBase.Views.QuestionNew({
      model: newQuestion, collection: this.questions
    });
    this._swapView(questionNewView);
  },

  questionShow: function (id) {
    var showQuestion = this.questions.getOrFetch(id);
    var questionShowView = new QueryBase.Views.QuestionShow({
      model: showQuestion
    });
    this._swapView(questionShowView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }

  // question show
  // onrender function
  // this.$().sortable();
  // Backbone.CompositeView.prototypr.onRender.call(this);
});
