QueryBase.Views.QuestionsIndex = Backbone.CompositeView.extend({

  className: 'questions-index',
  template: JST['questions/index'],

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addQuestionView);
    this.listenTo(this.collection, 'remove', this.removeQuestionView);
    this.collection.each(this.addQuestionView.bind(this));
  },

  render: function () {
    var questionIndexContent = this.template();
    this.$el.html(questionIndexContent);
    this.attachSubviews();
    return this;
  },

  addQuestionView: function (question) {
    var questionSubview = new QueryBase.Views.QuestionIndexItem({ model: question });
    this.addSubview('.question-index-items', questionSubview);
  },

  removeQuestionView: function (question) {
    this.removeModelSubview('.question-index-items', question);
  }

});
