QueryBase.Views.CommentsView = Backbone.CompositeView.extend({

  template: JST['comments/index'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addCommentView);
    this.listenTo(this.collection, 'remove', this.removeCommentView);
    this.collection.each(this.addCommentView.bind(this));

    this.addCommentForm();
  },

  render: function () {
    var commentsContent = this.template();
    this.$el.html(commentsContent);
    this.attachSubviews();
    return this;
  },

  events: {
    'submit .question-comment-form': 'createComment',
  },

  toggleCommentForm: function () {
    this.$('div.new-question-comment').toggleClass('hide');
    this.$('.new-question-comment textarea').focus();
  },

  addCommentForm: function () {
    var commentFormView = new QueryBase.Views.CommentForm({ model: this.model });
    this.addSubview('div.new-question-comment', commentFormView);
  },

  addCommentView: function (comment) {
    var commentSubview = new QueryBase.Views.CommentShow({ model: comment });
    this.addSubview('.question-comments', commentSubview);
  },

  removeCommentView: function (comment) {
    this.removeModelSubview('.question-comments', comment);
  },

  addAnswerForm: function () {
    var answerFormView = new QueryBase.Views.AnswerForm({ model: this.model });
    this.addSubview('.answer-form', answerFormView);
  },

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

});
