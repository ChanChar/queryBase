QueryBase.Collections.Users = Backbone.Collection.extend({

  url: 'users',
  model: QueryBase.Models.User,

  parse: function(response) {
    this.page_number = parseInt(response.page_number);
    this.total_pages = parseInt(response.total_pages);
    return response.models;
  },

  getOrFetch: function (id) {
    var user = this.get(id);
    var users = this;

    if (!user) {
      user = new QueryBase.Models.User({ id: id });
      user.fetch({
        success: function () {
          users.add(user);
        }
      });
    } else {
      user.fetch();
    }

    return user;
  },
});
