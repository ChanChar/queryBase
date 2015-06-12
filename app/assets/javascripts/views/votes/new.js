QueryBase.Views.VoteForm = Backbone.View.extend({

  template: JST['votes/new'],

  className: 'vote-buttons',

  initialize: function () {
    this.listenTo(this.model, 'sync change:score', this.render);
  },

  events: {
    'click .upvote-button': 'upVote',
    'click .downvote-button': 'downVote',
  },

  render: function () {
    var voteContent = this.template({ model: this.model });
    this.$el.html(voteContent);
    this.updateButtons();
    return this;
  },

  upVote: function () {

    if (this.model.vote().isNew()) {
      this.model.vote().save({ 'value': 1 }, {
        success: function() {
          this.model.upvote();
          this.$('.upvote-button').addClass('upvoted');
        }.bind(this)
      });
    } else if (this.model.vote().get('value') == -1) {
      this.model.vote().save({ 'value': 1 }, {
        success: function() {
          this.model.upvote();
          this.model.upvote();
          this.$('.upvote-button').addClass('upvoted');
          this.$('.downvote-button').removeClass('downvoted');
        }.bind(this)
      });
    } else {
      this.model.vote().destroy({
        success: function (model) {
          this.model.downvote();
          model.unset("id");
          model.unset("value");
          this.$('.upvote-button').removeClass('upvoted');
        }.bind(this)
      });
    }
  },

  downVote: function () {
    if (this.model.vote().isNew()) {
      this.model.vote().save({ 'value': -1 }, {
        success: function() {
          this.model.downvote();
          this.$('.upvote-button').removeClass('upvoted');
        }.bind(this)
      });
    } else if (this.model.vote().get('value') == 1) {
      this.model.vote().save({ 'value': -1 }, {
        success: function() {
          this.model.downvote();
          this.model.downvote();
          this.$('.upvote-button').removeClass('upvoted');
          this.$('.downvote-button').addClass('downvoted');
        }.bind(this)
      });
    } else {
      this.model.vote().destroy({
        success: function (model) {
          model.unset("id");
          model.unset('value');
          this.model.upvote();
          this.$('.downvote-button').removeClass('downvoted');
        }.bind(this)
      });
    }
  },

  updateButtons: function () {
    if (this.model.vote().escape('value') == 1) {
      this.$('.upvote-button').addClass('upvoted');
    } else if (this.model.vote().escape('value') == -1) {
      this.$('.downvote-button').addClass('downvoted');
    }
  },
});
