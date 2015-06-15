QueryBase.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.questions = new QueryBase.Collections.Questions();
    this.users = new QueryBase.Collections.Users();
    this.tagList = new QueryBase.Collections.Tags();
  },

  routes: {
    // '': 'landing',

    '': 'questionIndex',
    'questions/:id': 'questionShow',
    'questions/:id/edit': 'questionEdit',

    'users': 'usersIndex',
    'users/:id': 'userShow',
    'users/:id/edit': 'userEdit',

    'tags': 'tagIndex',
    'tags/:id': 'tagShow',

    'unanswered': 'unansweredIndex',
    'badges': 'badgesIndex',

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

  questionShow: function (id) {
    var showQuestion = this.questions.getOrFetch(id);
    var questionShowView = new QueryBase.Views.QuestionShow({
      model: showQuestion
    });
    this._swapView(questionShowView);
  },

  usersIndex: function () {
    this.users.fetch();
    var usersIndexView = new QueryBase.Views.UsersIndex({
      collection: this.users
    });

    this._swapView(usersIndexView);
  },

  userShow: function (id) {
    var user = this.users.getOrFetch(id);
    this.questions.fetch();
    var userShowView = new QueryBase.Views.UserShow({
      model: user, collection: this.questions
    });

    this._swapView(userShowView);
  },

  tagIndex: function () {
    this.tagList.fetch();
    var tagsIndexView = new QueryBase.Views.TagsIndex({
      collection: this.tagList
    });

    this._swapView(tagsIndexView);
  },

  tagShow: function (id) {
    var tag = this.tagList.getOrFetch(id);
    var tagShowView = new QueryBase.Views.TagShow({
      model: tag
    });

    this._swapView(tagShowView);
  },

  unansweredIndex: function () {
    this.questions.fetch();

    var unansweredIndexView = new QueryBase.Views.UnansweredIndex({
      collection: this.questions
    });
    this._swapView(unansweredIndexView);
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
