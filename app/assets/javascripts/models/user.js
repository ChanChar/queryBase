QueryBase.Models.User = Backbone.Model.extend({

  urlRoot: 'users',

  defaults: {
    points: 0,
  },

  parse: function (response) {

    if (response.questionsAsked) {
      this.questionsAsked().set(response.questionsAsked, { parse: true });
      delete response.questionsAsked;
    }

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

  questionsAsked: function () {
    if (!this._questions) {
      this._questions = new QueryBase.Collections.Questions([], { user: this });
    }

    return this._questions;
  },

  answers: function () {
    if (!this._answers) {
      this._answers = new QueryBase.Collections.Answers([], { user: this });
    }

    return this._answers;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new QueryBase.Collections.Comments([], { user: this });
    }

    return this._comments;
  },
});
