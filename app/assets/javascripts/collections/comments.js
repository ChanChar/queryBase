QueryBase.Collections.Comments = Backbone.Collection.extend({

  url: 'api/comments',
  model: QueryBase.Models.Comment,

  // getOrFetch needed?

});
