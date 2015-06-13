QueryBase.Models.Tag = Backbone.Model.extend({
  urlRoot: 'api/tags',

  parse: function (response) {
    if (response.tag) {
      this.tag().set(response.tag);
      delete response.tag;
    }

    if (response.questions) {
      this.questions().set(response.questions, { parse: true });
      delete response.questions;
    }

    return response;
  },

  tag: function () {
    if (!this._tag) {
      this._tag = new QueryBase.Models.Tag([], {});
    }

    return this._tag;
  },

  questions: function () {
    if (!this._questions) {
      this._questions = new QueryBase.Collections.Questions();
    }

    return this._questions;
  }

});
