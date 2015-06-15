QueryBase.Collections.Questions = Backbone.Collection.extend({

  url: 'api/questions',
  model: QueryBase.Models.Question,

  getOrFetch: function (id) {
    var question = this.get(id);
    var questions = this;

    if (!question) {
      question = new QueryBase.Models.Question({ id: id });
      question.fetch({
        success: function () {
          questions.add(question);
        }
      });
    } else {
      question.fetch();
    }

    return question;
  },

  comparator: function (question) {
    return question.id;
  },
});
