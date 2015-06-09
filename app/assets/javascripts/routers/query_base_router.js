QueryBase.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.questions = new QueryBase.Collections.Questions();
  },

  routes: {
    // '': 'landing',
    '': 'index',
    'questions/new': 'new',
    'questions/:id': 'show',
    'questions/:id/edit': 'edit',
  },

  landing: function () {
    var landingView = new QueryBase.Views.Landing();
    this._swapView(landingView);
  },

  index: function () {
    this.questions.fetch();
    var questionIndexView = new QueryBase.Views.QuestionsIndex({
      collection: this.questions
    });

    this._swapView(questionIndexView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }





});
