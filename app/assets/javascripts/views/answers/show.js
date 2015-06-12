QueryBase.Views.AnswerShow = Backbone.CompositeView.extend({

  template: JST['answers/show'],

  className: 'answer',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .delete-comment': 'deleteComment',
  },

  render: function () {
    var answerContent = this.template({ answer: this.model });
    this.$el.html(answerContent);
    return this;
  },

  deleteAnswer: function (event) {
    // TODO: add a confirm delete modal.

    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

});
