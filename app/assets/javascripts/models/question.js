QueryBase.Models.Question = Backbone.Model.extend({

  urlRoot: 'api/questions',

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

  incrementView: function (viewer_id) {
    var views = this.get('views');
    this.set('views', views + 1);
    this.save();
  },

  parse: function (response) {
    if (response.answers) {
      this.answers().set(response.answers, { parse: true });
      delete response.answers;
    }

    if (response.comments) {
      this.comments().set(response.comments);
      delete response.comments;
    }

    if (response.vote) {
      this.vote().set(response.vote);
      delete response.vote;
    }
    this.vote().set('votable_id', response.id);

    if (response.tag_list) {
      this.tag_list().set(response.tag_list);
      delete response.tag_list;
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

  vote: function () {
    if (!this._vote) {
      this._vote = new QueryBase.Models.Vote({ votable_type: 'Question' });
    }

    return this._vote;
  },

  tag_list: function () {
    if (!this._tag_list) {
      this._tag_list = new QueryBase.Collections.Tags([], { question: this });
    }

    return this._tag_list;
  }
});
