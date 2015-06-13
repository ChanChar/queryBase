QueryBase.Collections.Tags = Backbone.Collection.extend({

  url: 'api/tags',
  model: QueryBase.Models.Tag,

  getOrFetch: function (id) {
    var tag = this.get(id);
    var tags = this;

    if (!tag) {
      tag = new QueryBase.Models.Tag({ id: id });
      tag.fetch({
        success: function () {
          tags.add(tag);
        }
      });
    } else {
      tag.fetch();
    }

    return tag;
  },

});
