QueryBase.Views.QuestionNew = Backbone.CompositeView.extend({

  template: JST['questions/new'],

  className: 'new-question',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'submit form': 'createQuestion'
  },

  render: function () {
    var newQuestionContent = this.template();
    this.$el.html(newQuestionContent);
    return this;
  },

  createQuestion: function (event) {
    event.preventDefault();

    var params = this.$('form').serializeJSON();
    var questions = this.collection;
    var question = this.model.set(params);
    question.save({}, {
      success: function () {
        questions.add(question);
        $('#reveal-question-form').foundation('reveal', 'close');
        Backbone.history.navigate('questions/' + question.id, { trigger: true });
      }
    });
  },

});
