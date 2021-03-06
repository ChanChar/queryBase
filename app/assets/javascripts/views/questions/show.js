QueryBase.Views.QuestionShow = Backbone.CompositeView.extend({

  className: 'show-question',
  template: JST['questions/show'],

  initialize: function () {

    this.answers = this.model.answers();
    this.comments = this.model.comments();
    this.tag_list = this.model.tag_list();

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.comments, 'add', this.addCommentView);
    this.listenTo(this.comments, 'remove', this.removeCommentView);

    this.addAnswersView();
    this.addCommentForm();
    this.addVoteForm();
    this.addEditQuestionForm();
    this.incrementView();

    this.comments.each(this.addCommentView.bind(this));
  },

  events: {
    'submit .question-comment-form': 'createComment',
    'click a.show-comment-form': 'toggleCommentForm',
    'click .delete-link': 'deleteQuestion',
    'click .edit-question-form': 'showEditQuestion'
  },

  render: function () {
    var showQuestionContent = this.template({ question: this.model, tags: this.tag_list, answers: this.answers });
    this.$el.html(showQuestionContent);
    this.attachSubviews();
    return this;
  },

  addEditQuestionForm: function () {
    var questionEditView = new QueryBase.Views.QuestionEdit({
      model: this.model
    });
    this.addSubview('#reveal-edit-question-form', questionEditView);
  },

  showEditQuestion: function (event) {
    event.preventDefault();
    this.$('#reveal-edit-question-form').foundation('reveal', 'open');
  },

  incrementView: function () {
    this.model.incrementView();
  },

  addVoteForm: function () {
    var voteSubview = new QueryBase.Views.VoteForm({ model: this.model });
    this.addSubview('.question-vote', voteSubview);
  },

  addAnswersView: function () {
    var answersSubview = new QueryBase.Views.AnswersView({ collection: this.answers, model: this.model });
    this.addSubview('.answers', answersSubview);
  },

  addCommentView: function (comment) {
    var commentSubview = new QueryBase.Views.CommentShow({ model: comment });
    this.addSubview('.question-comments', commentSubview);
  },

  removeCommentView: function (comment) {
    this.removeModelSubview('.question-comments', comment);
  },

  toggleCommentForm: function () {
    this.$('div.new-question-comment').fadeToggle('fast', 'linear');
    this.$('.new-question-comment textarea').focus();
  },

  addCommentForm: function () {
    var commentFormView = new QueryBase.Views.CommentForm({ model: this.model });
    this.addSubview('div.new-question-comment', commentFormView);
  },

  // TODO: refactor
  createComment: function (event) {
    event.preventDefault();
    var questionView = this;
    var commentParams = this.$('.new-question-comment .question-comment-form').serializeJSON();
    var comments = this.comments;
    var newComment = new QueryBase.Models.Comment();
    newComment.set(commentParams);
    newComment.save({}, {
      success: function () {
        comments.add(newComment);
        questionView.$('.new-question-comment question-comment-form textarea').val('');
        Backbone.history.navigate('dummyView');
        Backbone.history.navigate('#questions/' + questionView.model.id, { trigger: true });
      }
    });
  },

  deleteQuestion: function (event) {
    event.preventDefault();
    this.model.destroy({
      success: function () {
        Backbone.history.navigate('/#questions', { trigger: true });
      }
    });
  }
});
