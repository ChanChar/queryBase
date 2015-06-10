QueryBase.Views.QuestionIndexItem = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'index-item ',
  template: JST['questions/index-item'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    // this.answerBox();
  },

  render: function () {
    var questionIndexItemContent = this.template({ question: this.model });
    this.$el.html(questionIndexItemContent);
    if (this.model.answers().length > 0) {
      this.$('.answer-count').addClass('has-answer');
    }
    return this;
  },
});
