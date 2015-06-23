QueryBase.Collections.Answers = Backbone.Collection.extend({
  url: 'api/answers',
  model: QueryBase.Models.Answer,

  resetBestAnswer: function () {
    var previousBest = this.findWhere({ 'best': true });
    if (previousBest) {
      previousBest.save({ 'best': false });
    }
  },

  comparator: function (answer) {
    return answer.get('score');
  },
});
