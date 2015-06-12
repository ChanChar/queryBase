QueryBase.Views.VoteForm = Backbone.View.extend({

  template: JST['votes/new'],

  className: 'vote-buttons',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .upvote-button': 'upVote',
    'click .downvote-button': 'downVote',
  },

  render: function () {
    var voteContent = this.template({ model: this.model });
    this.$el.html(voteContent);
    return this;
  },

  upVote: function () {
    if (this.model.vote().isNew()) {
      this.model.vote().save({ 'question_id': this.model.id, 'value': 1 }, {
        success: function() {
          this.updateVoteCount(1);
          this.$('.upvote-button').addClass('upvoted');
        }.bind(this)
      });
    } else if (this.model.vote().value == -1) {
      this.model.vote().save({ 'question_id': this.model.id, 'value': 1 }, {
        success: function() {
          this.updateVoteCount(2);
          this.$('.upvote-button').addClass('upvoted');
          this.$('.downvote-button').removeClass('downvoted');
        }
      });
    } else {
      this.model.vote().destroy({
        success: function (model) {
          model.unset("id");
          this.updateVoteCount(-1);
          this.$('.upvote-button').removeClass('upvoted');
        }.bind(this)
      });
    }
  },

  downVote: function () {
    if (this.model.vote().isNew()) {
      this.model.vote().save({ 'question_id': this.model.id, 'value': -1 }, {
        success: function() {
          this.updateVoteCount(-1);
          this.$('.upvote-button').removeClass('upvoted');
        }.bind(this)
      });
    } else if (this.model.vote().value == 1) {
      this.model.vote().save({ 'question_id': this.model.id, 'value': -1 }, {
        success: function() {
          this.updateVoteCount(-2);
          this.$('.upvote-button').removeClass('upvoted');
          this.$('.downvote-button').addClass('downvoted');
        }
      });
    } else {
      this.model.vote().destroy({
        success: function (model) {
          model.unset("id");
          this.updateVoteCount(-1);
          this.$('.downvote-button').removeClass('downvoted');
        }.bind(this)
      });
    }
  },

  // does this work?
  updateVoteCount: function (delta) {
    debugger;
    this.model.set("votes", this.model.get("votes") + delta);
  },

});
