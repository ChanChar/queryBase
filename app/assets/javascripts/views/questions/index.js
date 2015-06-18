QueryBase.Views.QuestionsIndex = Backbone.CompositeView.extend({

  className: 'questions-index row',
  template: JST['questions/index'],

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addQuestionView);
    this.listenTo(this.collection, 'remove', this.removeQuestionView);
    this.collection.each(this.addQuestionView.bind(this));
  },

  events: {
    'keyup .questions-search': 'searchQuestions',
  },

  render: function () {
    var questionIndexContent = this.template();
    this.$el.html(questionIndexContent);
    this.attachSubviews();
    this.renderMoreQuestions();
    return this;
  },

  renderMoreQuestions: function () {
    $(window).off("scroll");
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
    $(window).on("scroll", throttledCallback);
  },

  nextPage: function () {
    var view = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      if (view.collection.page_number < view.collection.total_pages) {
        view.collection.fetch({
          data: { page: view.collection.page_number + 1 },
          remove: false
        });
      }
    }
  },

  renderSearchResults: function (questions) {

    var questionsIndexContent = this.template();
    this.collection.each(this.removeQuestionView.bind(this));

    if (questions.length > 0) {
      questions.forEach(this.addQuestionView.bind(this));
    } else {
      // fix this later!
      // this.removeSubview('.question-index-items');
      // var emptySearchView = new QueryBase.Views.EmptySearch();
      // this.addSubview('.question-index-items', emptySearchView);
    }

    this.attachSubviews();
    return this;
  },

  addQuestionView: function (question) {
    var questionSubview = new QueryBase.Views.QuestionIndexItem({ model: question });
    this.addSubview('.question-index-items', questionSubview);
  },

  removeQuestionView: function (question) {
    this.removeModelSubview('.question-index-items', question);
  },

  searchQuestions: function(event) {
    var questionsIndexView = this;
    _.debounce(questionsIndexView.filterQuestions(), 500);
  },

  filterQuestions: function () {
    var searchParams = new RegExp($('.questions-search').val(), 'gi'); // g=global, i=case insensitive
    var foundQuestions = this.collection.filter(function (question) {
      return searchParams.test(question.get('title'));
    });

    this.renderSearchResults(foundQuestions);
  }

});
