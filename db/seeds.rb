User.create(email: 'charleschanlee@gmail.com', password: 'password')
User.create(email: 'jonsnow@thewall.com', password: 'nothing')
User.create(email: 'tenderlove@ruby.com', password: 'cats4life')

Question.create(asker_id: 1, title: 'How do you represent polymorphic associations in Backbone?',
                description: "Currently trying to have comments and votes for a SO like project.")

Question.create(asker_id: 1, title: 'What are composite views in Backbone?',
                description: 'Is there a better way to break down views in Backbone?')

Question.create(asker_id: 1, title: 'How can I use modals in Backbone?',
                description: 'Do I need to set events to trigger a modal show and have the modal itself in the template?')

# Question.create(asker_id: 2, title: 'Is winter coming?',
#                 description: 'Should I be prepared for battle?')

Answer.create(question_id: 1, answerer_id: 2, body: 'It is any function that uses variables that were neither passed in or created within the function.')
# Answer.create(question_id: 2, answerer_id: 1, best: true, points: 50, body: 'You know nothing Jon Snow.')

Comment.create(commenter_id: 3, commentable_type: 'Question', commentable_id: 1, body: 'Do you have any examples that you want to have clarified?')
