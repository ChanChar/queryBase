QueryBase.Models.Answer = Backbone.Model.extend({

  urlRoot: 'api/answers',

  parse: function (response) {
    if (response.comments) {
      this.comments().set(response.comments);
      delete response.comments;
    }

    if (response.vote) {
      this.vote().set(response.vote);
      delete response.vote;
    }

    if (response.votes) {
      this.votes().set(response.votes);
      delete response.votes;
    }

    return response;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new QueryBase.Collections.Comments([], { question: this });
    }

    return this._comments;
  },

  votes: function () {
    if (!this._votes) {
      this._votes = new QueryBase.Collections.Votes([], { question: this });
    }

    return this._votes;
  },

  vote: function () {
    if (!this._vote) {
      this._vote = new QueryBase.Models.Vote({ votable_type: 'Question' });
    }
  }
});
