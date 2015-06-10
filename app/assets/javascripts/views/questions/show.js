QueryBase.Views.QuestionShow = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'show-question',
  template: JST['questions/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
  },

  render: function () {
    debugger;
    var showQuestionContent = this.template({ question: this.model });
    this.$el.html(showQuestionContent);
    return this;
  },

});
