QueryBase.Views.QuestionShow = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'show-question',
  template: JST['questions/show'],

  initialize: function () {
    this.answers = this.model.answers();
    this.comments = this.model.comments();

    this.listenTo(this.model, 'sync', this.render);

    this.listenTo(this.answers, 'add', this.addAnswerView);
    this.listenTo(this.answers, 'remove', this.removeAnswerView);
    this.listenTo(this.comments, 'add', this.addCommentView);
    this.listenTo(this.comments, 'remove', this.removeCommentView);

    this.addAnswerForm();
    this.addCommentForm();

    this.comments.each(this.addCommentView.bind(this));
    this.answers.each(this.addAnswerView.bind(this));
  },

  events: {
    'submit .answer-form': 'createAnswer',
    'submit .question-comment-form': 'createComment',
    'click a.show-comment-form': 'toggleCommentForm'
  },

  render: function () {
    var showQuestionContent = this.template({ question: this.model });
    this.$el.html(showQuestionContent);
    this.attachSubviews();
    return this;
  },

  addAnswerView: function (answer) {
    var answerSubview = new QueryBase.Views.AnswerShow({ model: answer });
    this.addSubview('.answers', answerSubview);
  },

  removeAnswerView: function (answer) {
    this.removeModelSubview('.answers', answer);
  },

  addCommentView: function (comment) {
    var commentSubview = new QueryBase.Views.CommentShow({ model: comment });
    this.addSubview('.question-comments', commentSubview);
  },

  removeCommentView: function (comment) {
    this.removeModelSubview('.question-comments', comment);
  },

  toggleCommentForm: function () {
    this.$('div.question-comment-form').toggleClass('hide');
  },

  addCommentForm: function () {
    var commentFormView = new QueryBase.Views.CommentForm({ model: this.model });
    this.addSubview('.question-comment-form', commentFormView);
  },

  // TODO: refactor too long, messy.
  createComment: function (event) {
    event.preventDefault();
    var questionView = this;
    var commentParams = this.$('.question-comment-form form').serializeJSON();
    var comments = this.comments;
    var newComment = new QueryBase.Models.Comment();
    newComment.set(commentParams);
    newComment.save({}, {
      success: function () {
        comments.add(newComment);
        questionView.$('.question-form form textarea').val('');
        Backbone.history.navigate('dummyView');
        Backbone.history.navigate('#questions/' + questionView.model.id, { trigger: true });
      }
    });
  },

  addAnswerForm: function () {
    var answerFormView = new QueryBase.Views.AnswerForm({ model: this.model });
    this.addSubview('.answer-form', answerFormView);
  },

  // refactor this method. Too many vars and too many methods within it.
  createAnswer: function (event) {
    event.preventDefault();
    var questionView = this;
    var answerParams = this.$('.answer-form form').serializeJSON();
    var answers = this.answers;
    var newAnswer = new QueryBase.Models.Answer();
    newAnswer.set(answerParams);
    newAnswer.save({}, {
      success: function () {
        answers.add(newAnswer);
        questionView.$('.answer-form form textarea').val('');
        Backbone.history.navigate('dummyView');
        Backbone.history.navigate('#questions/' + questionView.model.id, { trigger: true });
      }
    });
  }
});
