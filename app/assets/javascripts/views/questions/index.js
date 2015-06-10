QueryBase.Views.QuestionsIndex = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'container questions-index',
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
    // this.onRender
    return this;
  },

  // onRender: function () {
  // this.$(jsadlad).addClass('')
  // Backbone.CompositeView.prototype.onRender.call(this);
  // },

  addQuestionView: function (question) {
    var questionSubview = new QueryBase.Views.QuestionIndexItem({ model: question });
    this.addSubview('.question-index-items', questionSubview);
  },

  removeQuestionView: function (question) {
    this.removeSubview('.question-index-items', question);
  }

});
