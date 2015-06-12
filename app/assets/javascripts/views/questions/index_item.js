QueryBase.Views.QuestionIndexItem = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'question-index-item ',
  template: JST['questions/index-item'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var questionIndexItemContent = this.template({ question: this.model, tags: this.model.tag_list() });
    this.$el.html(questionIndexItemContent);
    if (this.model.answers().length > 0) {
      this.$('.answer-count').addClass('has-answer');
    }
    return this;
  },
});
