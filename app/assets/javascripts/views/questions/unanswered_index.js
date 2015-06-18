QueryBase.Views.UnansweredIndex = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'unanswered-index-item ',
  template: JST['questions/unanswered-index'],

  initialize: function () {
    // this.listenTo(this.unansweredQuestions, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addQuestionView);
    this.listenTo(this.collection, 'remove', this.removeQuestionView);
    this.collection.each(this.addQuestionView.bind(this));
  },

  render: function () {
    var unansweredIndexContent = this.template();
    this.$el.html(unansweredIndexContent);
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

  addQuestionView: function (question) {
    if (question.answers().length !== 0) {
      return;
    }
    var questionSubview = new QueryBase.Views.QuestionIndexItem({ model: question });
    this.addSubview('.unanswered-index-items', questionSubview);
  },

  removeQuestionView: function (question) {
    this.removeSubview('.unanswered-index-items', question);
  }

});
