QueryBase.Collections.Questions = Backbone.Collection.extend({

  url: 'api/questions',
  model: QueryBase.Models.Question,
  fetchParams: { searchParams: "", page: 0 },

  parse: function (response) {
    this.page_number = parseInt(response.page_number);
    this.total_pages = parseInt(response.total_pages);
    return response.models;
  },

  fetchNextPage: function (options) {
    this.fetchParams.page += 1;
    this.fetch(_.extend({ data: this.fetchParams }, options));
  },

  search: function (str) {
    if (str == this.fetchParams.searchParams) {
      this.fetchNextPage({ remove: false });
    } else {
      this.fetchParams.searchParams = str;
      this.fetchParams.page = 0;
      this.fetchNextPage({ remove: true });
    }
    return this;
  },

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
    return -question.get('id');
  },
});
