QueryBase.Views.QuestionNew = Backbone.CompositeView.extend({

  tagName: 'form',
  className: 'new-question',
  template: JST['questions/new'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'submit form.new-question': 'createQuestion'
  },

  render: function () {
    var newQuestionContent = this.template();
    this.$el.html(newQuestionContent);
    return this;
  },

  // test this function;
  createQuestion: function () {
    var params = this.$el.serializeJSON();
    var questions = this.collection;
    var question = this.model.set(params);
    this.model.fetch({}, {
      success: function () {
        questions.add(question, { merge: true });
        Backbone.history.navigate('questions/' + question.id, { trigger: true });
      }
    });
  },

});
