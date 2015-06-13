QueryBase.Views.TagShow = Backbone.CompositeView.extend({

  template: JST['tags/show'],
  className: 'tag-show',

  initialize: function () {
    this.tag = this.model.tag();
    this.questionsWithTag = this.model.questions();

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.questionsWithTag, 'sync', this.render);
    this.listenTo(this.questionsWithTag, 'add', this.addQuestionView);
    this.listenTo(this.questionsWithTag, 'remove', this.removeQuestionView);

    this.questionsWithTag.each(this.addQuestionView.bind(this));
  },

  render: function () {
    var tagsIndexContent = this.template({
      questions: this.questionsWithTag, tag: this.tag
    });
    this.$el.html(tagsIndexContent);
    this.attachSubviews();
    this.matchTag();
    return this;
  },

  addQuestionView: function (question) {
    var questionSubview = new QueryBase.Views.QuestionIndexItem({ model: question });
    this.addSubview('.questions-with-tag', questionSubview);
  },

  removeQuestionView: function (question) {
    this.removeModelSubview('.questions-with-tag', question);
  },

  matchTag: function() {
    this.questionsWithTag.each(this.addMatchColor.bind(this));
  },

  addMatchColor: function (question) {
    var tagShow = this;
    question.tag_list().each(function (tag) {
      if (tag.id == tagShow.tag.id) {
        tagShow.$('.tag').each(function (i, tag) {
          if ($(tag).attr('href') == '#tags/' + tagShow.tag.id) {
            $(tag).addClass('matched-tag');
          }
        });
      }
    });
  }
});
