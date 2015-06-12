QueryBase.Models.Question = Backbone.Model.extend({

  urlRoot: 'api/questions',

  parse: function (response) {
    if (response.answers) {
      this.answers().set(response.answers, { parse: true });
      delete response.answers;
    }

    if (response.comments) {
      this.comments().set(response.comments);
      delete response.comments;
    }

    if (response.votes) {
      this.votes().set(response.votes);
      delete response.votes;
    }

    if (response.vote) {
      this.vote().set(response.vote);
      delete response.vote;
    }

    return response;
  },

  answers: function () {
    if (!this._answers) {
      this._answers = new QueryBase.Collections.Answers([], { question: this });
    }

    return this._answers;
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

    return this._vote;
  }
});
