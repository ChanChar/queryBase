QueryBase.Views.UnansweredIndex = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'unanswered-index-item ',
  template: JST['questions/unanswered-index'],

  initialize: function () {
    this.listenTo(this.unansweredQuestions, 'sync', this.render);
    this.listenTo(this.unansweredQuestions, 'add', this.addQuestionView);
    this.listenTo(this.unansweredQuestions, 'remove', this.removeQuestionView);
  },

  render: function () {
    var unansweredIndexContent = this.template();
    this.$el.html(unansweredIndexContent);
    this.unansweredQuestions = this.collection.filter(function (question) {
      if (question.answers().length === 0) {
        return question;
      }
    });

    this.unansweredQuestions.forEach(this.addQuestionView.bind(this));
    this.attachSubviews();
    return this;
  },

  addQuestionView: function (question) {
    var questionSubview = new QueryBase.Views.QuestionIndexItem({ model: question });
    this.addSubview('.unanswered-index-items', questionSubview);
  },

  removeQuestionView: function (question) {
    this.removeSubview('.unanswered-index-items', question);
  }

});
