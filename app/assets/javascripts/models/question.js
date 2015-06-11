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
  }
});
