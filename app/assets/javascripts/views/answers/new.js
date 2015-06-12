QueryBase.Views.AnswerForm = Backbone.View.extend({

  template: JST['answers/new'],

  tagName: 'form',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var answerContent = this.template({ question: this.model });
    this.$el.html(answerContent);
    return this;
  },

});
