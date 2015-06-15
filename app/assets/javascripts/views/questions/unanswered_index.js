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
    return this;
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
