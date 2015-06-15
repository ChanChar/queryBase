QueryBase.Views.AnswerForm = Backbone.View.extend({

  template: JST['answers/new'],

  tagName: 'form',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'keyup .new-answer-body': 'updatePreview',
  },

  render: function () {
    var answerContent = this.template({ question: this.model });
    this.$el.html(answerContent);
    return this;
  },

  updatePreview: function () {
    var bodyContent = this.$('.new-answer-body').val();
    var previewContent = marked(bodyContent);
    this.$('.preview').html(previewContent);
  },

});
