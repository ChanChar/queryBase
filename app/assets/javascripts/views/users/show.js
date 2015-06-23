QueryBase.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],
  className: 'user-page',

  initialize: function () {

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.collection);
    this.listenTo(this.collection, 'add', this.addQuestionView);
    this.listenTo(this.collection, 'remove', this.removeQuestionView);
    this.collection.each(this.addQuestionView.bind(this));
  },

  events: {
    'click .change-photo-link': 'showPhotoUpload',
  },

  render: function () {
    var questions = this.askedQuestions();
    var userContent = this.template({ user: this.model, questions: questions });
    // this.highlightPoints();
    this.$el.html(userContent);
    this.renderMoreAskedQuestions();
    this.attachSubviews();
    return this;
  },

  showPhotoUpload: function (event) {
    event.preventDefault();
    var currentUser = this.model;
    cloudinary.openUploadWidget(window.CLOUDINARY_OPTIONS, function(error, result){
      var data = result[0];
      currentUser.set({ image_url: data.url });
      currentUser.save({}, {
        success: function(){
          Backbone.history.navigate('dummyView');
          Backbone.history.navigate('#users/' + currentUser.id, { trigger: true });
        }
      });
    });
  },

  renderMoreAskedQuestions: function () {
    $(window).off("scroll");
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
    $(window).on("scroll", throttledCallback);
  },

  nextPage: function () {
    var view = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      if (view.collection.page_number < view.collection.total_pages) {
        console.log(view.model.get('name'));
        view.collection.fetch({
          data: {
            page: view.collection.page_number + 1,
            asker_id: view.model.id
          },
          remove: false
        });
      }
    }
  },

  addQuestionView: function (question) {
    if (question.get('asker_id') != this.model.id) {
      return;
    }
    var questionSubview = new QueryBase.Views.QuestionIndexItem({ model: question });
    this.addSubview('.asked-questions', questionSubview);
  },

  removeQuestionView: function (question) {
    this.removeSubview('.asked-questions', question);
  },

  askedQuestions: function () {
    var questions = [];
    var currentUser = this.model;
    this.collection.each(function (question) {
      if (question.get('asker_id') == currentUser.id) {
        questions.push(question);
      }
    });

    return questions;
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
