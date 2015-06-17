QueryBase.Views.AnswerEdit = Backbone.CompositeView.extend({

  template: JST['answers/edit'],

  className: 'edit-answer',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'submit form.answer-edit': 'editAnswer',
    'click .cancel': 'cancelEdit',
    'keyup .edit-answer-description': 'updatePreview',
  },

  render: function () {
    var editAnswerContent = this.template({ answer: this.model });
    this.$el.html(editAnswerContent);
    return this;
  },

  updatePreview: function () {
    var bodyContent = this.$('.edit-answer-description').val();
    var previewContent = marked(bodyContent);
    this.$('.preview').html(previewContent);
  },

  editAnswer: function (event) {
    event.preventDefault();
    var params = this.$('.answer-edit').serializeJSON();
    this.model.save(params, {
      success: function () {
        $('#reveal-edit-answer-form').foundation('reveal', 'close');
      }.bind(this)
    });
  },

  cancelEdit: function (event) {
    event.preventDefault();
    $('#reveal-answer-form').foundation('reveal', 'close');
  }

});
