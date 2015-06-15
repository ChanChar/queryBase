QueryBase.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],
  className: 'user-page',

  initialize: function () {

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addQuestionView);
    this.listenTo(this.collection, 'remove', this.removeQuestionView);
    this.collection.each(this.addQuestionView.bind(this));
  },

  render: function () {
    var userContent = this.template({ user: this.model });
    // this.highlightPoints();
    this.$el.html(userContent);
    this.attachSubviews();
    return this;
  },

  addQuestionView: function (question) {
    if(question.get('asker_id') != this.model.id) {
      return;
    }
    var questionSubview = new QueryBase.Views.QuestionIndexItem({ model: question });
    this.addSubview('.asked-questions', questionSubview);
  },

  removeQuestionView: function (question) {
    this.removeSubview('.asked-questions', question);
  }

  // implement later.
  // highlightPoints: function () {
  //   if (this.model.get('points') > 0) {
  //     this.$('.user-points').addClass('positive-number');
  //   } else if (this.model.get('points') < 0) {
  //     this.$('.user-points').addClass('negative-number');
  //   }
  // }

});
