QueryBase.Collections.Users = Backbone.Collection.extend({

  url: 'users',
  model: QueryBase.Models.User,

  parse: function(response) {
    this.page_number = parseInt(response.page_number);
    this.total_pages = parseInt(response.total_pages);
    return response.models;
  },

  fetchParams: { searchParams: "", page: 0 },

  fetchNextPage: function (options) {
    this.fetchParams.page += 1;
    this.fetch(_.extend({ data: this.fetchParams }, options));
  },

  search: function (str) {
    if (str == this.fetchParams.searchParams) {
      this.fetchNextPage({ remove: false });
    } else {
      // refactor
      this.fetchParams.searchParams = str;
      this.fetchParams.page = 0;
      this.fetchNextPage({ remove: true });
    }
    return this;
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
