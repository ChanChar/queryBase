QueryBase.Views.AnswerShow = Backbone.CompositeView.extend({

  template: JST['answers/show'],

  className: 'answer',

  initialize: function () {
    this.comments = this.model.comments();

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.comments, 'add', this.addCommentView);
    this.listenTo(this.comments, 'remove', this.deleteCommentView);
    this.listenTo(this.model, 'sync change:best', this.render);

    this.addCommentForm();
    this.addVoteForm();
    this.addEditAnswerForm();

    this.comments.each(this.addCommentView.bind(this));
  },

  events: {
    'click .answer-delete-link': 'deleteAnswer',
    'submit .answer-comment-form': 'createComment',
    'click a.show-answer-comment-form': 'toggleCommentForm',
    'click .mark-best-link': 'markAnswerBest',
    'click .answer-edit-show': 'showEditAnswer',
    'click .answerer-info .row': 'showUserPage',
  },

  render: function () {
    var answerContent = this.template({ answer: this.model });
    this.$el.html(answerContent);
    this.attachSubviews();
    this.bestAnswerCheck();
    return this;
  },

  markAnswerBest: function () {
    this.collection.resetBestAnswer();
    this.model.save({ 'best': true }, {
      success: function () {
        this.model.markBest();
      }.bind(this)
    });
    Backbone.history.navigate('#questions/' + this.model.escape('question_id'), { trigger: true });
  },

  showUserPage: function () {
    Backbone.history.navigate('#users/' + this.model.get("answerer_id"), { trigger: true });
  },

  addEditAnswerForm: function () {
    var answerEditView = new QueryBase.Views.AnswerEdit({
      model: this.model
    });
    this.addSubview('#reveal-edit-answer-form', answerEditView);
  },

  showEditAnswer: function (event) {
    event.preventDefault();
    this.$('#reveal-edit-answer-form').foundation('reveal', 'open');
  },

  bestAnswerCheck: function () {
    if (this.model.get('best')) {
      this.$('.best-answer').text('Best Answer');
    }
  },

  deleteAnswer: function (event) {
    // TODO: add a confirm delete modal.
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  addCommentView: function (comment) {
    var commentSubview = new QueryBase.Views.CommentShow({ model: comment });
    this.addSubview('.answer-comments', commentSubview);
  },

  deleteCommentView: function (comment) {
    this.removeModelSubview('.answer-comments', comment);
  },

  toggleCommentForm: function () {
    this.$('.new-answer-comment').fadeToggle('fast', 'linear');
    this.$('.new-answer-comment textarea').focus();
  },

  addCommentForm: function () {
    var commentFormView = new QueryBase.Views.CommentForm({ model: this.model });
    this.addSubview('.new-answer-comment', commentFormView);
  },

  createComment: function (event) {
    event.preventDefault();
    var answerView = this;
    var commentParams = this.$('.answer-comment-form').serializeJSON();
    var comments = this.comments;
    var newComment = new QueryBase.Models.Comment();
    newComment.set(commentParams);
    newComment.save({}, {
      success: function () {
        comments.add(newComment);
        answerView.$('.answer-comment-form textarea').val('');
        Backbone.history.navigate('dummyView');
        Backbone.history.navigate('#questions/' + answerView.model.get('question_id'), { trigger: true });
      }
    });
  },

  addVoteForm: function () {
    var voteSubview = new QueryBase.Views.VoteForm({ model: this.model });
    this.addSubview('.answer-vote', voteSubview);
  },
});
