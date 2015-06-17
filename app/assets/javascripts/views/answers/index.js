QueryBase.Views.AnswersView = Backbone.CompositeView.extend({

  template: JST['answers/index'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addAnswerView);
    this.listenTo(this.collection, 'remove', this.removeAnswerView);
    this.collection.each(this.addAnswerView.bind(this));

    this.addAnswerForm();
  },

  render: function () {
    var answersContent = this.template();
    this.$el.html(answersContent);
    this.attachSubviews();
    return this;
  },

  events: {
    'submit .answer-form': 'createAnswer',
  },

  addAnswerView: function (answer) {
    var answerSubview = new QueryBase.Views.AnswerShow({ model: answer, collection: this.collection });
    this.addSubview('.answer-index-items', answerSubview);
  },

  removeAnswerView: function (answer) {
    this.removeModelSubview('.answer-index-items', answer);
    this.render();
  },

  addAnswerForm: function () {
    var answerFormView = new QueryBase.Views.AnswerForm({ model: this.model });
    this.addSubview('.answer-form', answerFormView);
  },

  createAnswer: function (event) {
    event.preventDefault();
    var answersView = this;
    var answerParams = this.$('.answer-form form').serializeJSON();
    var answers = this.collection;
    var newAnswer = new QueryBase.Models.Answer();
    newAnswer.set(answerParams);
    newAnswer.save({}, {
      success: function () {
        answers.add(newAnswer);
        answersView.$('.answer-form form textarea').val('');
        Backbone.history.navigate('dummyView');
        Backbone.history.navigate('#questions/' + answersView.model.id, { trigger: true });
      }
    });
  },
});
