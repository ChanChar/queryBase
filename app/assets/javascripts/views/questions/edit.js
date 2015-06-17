QueryBase.Views.QuestionEdit = Backbone.CompositeView.extend({

  template: JST['questions/edit'],

  className: 'edit-question',

  initialize: function () {
    this.tags = this.model.tag_list();

    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'submit form.question-edit': 'editQuestion',
    'click .cancel': 'cancelEdit',
    'keyup .edit-question-description': 'updatePreview',
  },

  render: function () {
    var currentTags = this.getTagNames();
    var editQuestionContent = this.template({ question: this.model, tags: currentTags });
    this.$el.html(editQuestionContent);
    return this;
  },

  getTagNames: function () {
    var tagNames = [];
    this.tags.each(function (tag) {
      tagNames.push(tag.get('name'));
    });

    return tagNames.join(', ');
  },

  updatePreview: function () {
    var bodyContent = this.$('.edit-question-description').val();
    var previewContent = marked(bodyContent);
    this.$('.preview').html(previewContent);
  },

  editQuestion: function (event) {
    event.preventDefault();

    var params = this.$('.question-edit').serializeJSON();
    this.model.save(params, {
      success: function () {
        $('#reveal-edit-question-form').foundation('reveal', 'close');
        Backbone.history.navigate('dummyView'); // refactor
        Backbone.history.navigate('questions/' + this.model.id, { trigger: true });
      }.bind(this)
    });
  },

  cancelEdit: function (event) {
    event.preventDefault();
    $('#reveal-question-form').foundation('reveal', 'close');
  }

});
