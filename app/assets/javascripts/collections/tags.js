QueryBase.Collections.Tags = Backbone.Collection.extend({

  url: 'api/tags',
  model: QueryBase.Models.Tag,

  parse: function (response) {
    this.page_number = parseInt(response.page_number);
    this.total_pages = parseInt(response.total_pages);
    return response.models;
  },

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
