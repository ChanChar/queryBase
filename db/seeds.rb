User.create(email: 'charleschanlee@gmail.com', password: 'password')
User.create(email: 'jonsnow@thewall.com', password: 'nothing')
User.create(email: 'tenderlove@ruby.com', password: 'cats4life')

Question.create(asker_id: 1, title: 'What is a closure?',
                description: "I'm trying to wrap my heard around what Javascript closures are. Are they some sort of special function?")

Question.create(asker_id: 2, title: 'Is winter coming?',
                description: 'Should I be prepared for battle?')

Question.create(asker_id: 1, title: 'What are composite views in Backbone?',
                description: 'I wanted a better way to break down my app views.')


Answer.create(question_id: 1, answerer_id: 2, body: 'It is any function that uses variables that were neither passed in or created within the function.')
Answer.create(question_id: 2, answerer_id: 1, best: true, points: 50, body: 'You know nothing Jon Snow.')

Comment.create(commenter_id: 3, commentable_type: 'Question', commentable_id: 1, body: 'Do you have any examples that you want to have clarified?')
