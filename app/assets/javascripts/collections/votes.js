QueryBase.Collections.Votes = Backbone.Collection.extend({
  url: 'api/votes',
  model: QueryBase.Models.Vote,

});
