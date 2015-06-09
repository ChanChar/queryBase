QueryBase.Views.QuestionIndexItem = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'index-item',
  template: JST['questions/index-item'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var questionIndexItemContent = this.template({ question: this.model });
    this.$el.html(questionIndexItemContent);
    return this;
  },
});
