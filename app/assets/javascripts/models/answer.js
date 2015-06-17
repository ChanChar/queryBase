QueryBase.Models.Answer = Backbone.Model.extend({

  urlRoot: 'api/answers',

  defaults: {
    score: 0,
  },

  upvote: function () {
    var score = this.get('score');
    this.set('score', score + 1);
  },

  downvote: function () {
    var score = this.get('score');
    this.set('score', score - 1);
  },

  markBest: function () {
    this.set('best', true);
  },

  parse: function (response) {
    if (response.comments) {
      this.comments().set(response.comments);
      delete response.comments;
    }

    if (response.vote) {
      this.vote().set(response.vote);
      delete response.vote;
    }

    this.vote().set('votable_id', response.id);

    return response;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new QueryBase.Collections.Comments([], { question: this });
    }

    return this._comments;
  },

  vote: function () {
    if (!this._vote) {
      this._vote = new QueryBase.Models.Vote({ votable_type: 'Answer' });
    }

    return this._vote;
  }
});
