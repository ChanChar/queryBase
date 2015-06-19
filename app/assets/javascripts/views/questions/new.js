QueryBase.Views.QuestionNew = Backbone.CompositeView.extend({

  template: JST['questions/new'],

  className: 'new-question',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'submit form.new-question-form': 'createQuestion',
    'click .cancel': 'cancelCreate',
    'keyup .new-question-description': 'updatePreview',
    'click .close-reveal-modal': 'clearQuestionBody',
  },

  render: function () {
    var newQuestionContent = this.template();
    this.$el.html(newQuestionContent);
    return this;
  },

  updatePreview: function () {
    var bodyContent = this.$('.new-question-description').val();
    var previewContent = marked(bodyContent);
    this.$('.preview').html(previewContent);
  },

  createQuestion: function (event) {
    event.preventDefault();

    var params = this.$('form').serializeJSON();
    var questions = this.collection;
    var question = this.model.set(params);
    this.clearQuestionBody();
    question.save({}, {
      success: function () {
        questions.add(question);
        $('#reveal-question-form').foundation('reveal', 'close');
        Backbone.history.navigate('questions/' + question.id, { trigger: true });
      }
    });
  },

  clearQuestionBody: function () {
    this.$('.new-question-title').val('');
    this.$('.new-question-description').val('');
    this.$('.new-question-tags').val('');
    this.$('.preview').html('');
  },

  cancelCreate: function (event) {
    event.preventDefault();
    this.clearQuestionBody();
    $('#reveal-question-form').foundation('reveal', 'close');
  }

});
