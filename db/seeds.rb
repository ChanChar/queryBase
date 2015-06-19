User.create(email: 'charleschanlee@gmail.com', username: 'TheCharlie', password: 'password', image_url: 'http://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/000/681/original/charlie_lee.jpg?1429734840')
User.create(email: 'jonsnow@thewall.com', username: 'JonnySnow', password: 'nothing', image_url: 'http://rs386.pbsrc.com/albums/oo307/AlbusSPotter/02-Jon-Snow-played-by-Kit-Harington-1.jpg~c200')
User.create(email: 'curiousgeorge@monkey.com', username: 'C.George', password: 'banana', image_url: 'http://www-tc.pbskids.org/shell/images/content/show-bubbles/circle/curious-george.png')

10.times do
  new_user = `curl http://uifaces.com/api/v1/random`
  json_user = JSON.parse(new_user)
  username = json_user['username']
  image_url = json_user['image_urls']['epic']

  created_user = User.create(email: 'sampleUser' + SecureRandom.base64 + '@gmail.com',
              username: username, password: SecureRandom.base64,
              image_url: image_url)

  created_user.owned_badges.create({ badge_id: 1 })
end


Question.create(asker_id: 1, title: 'How do you represent polymorphic associations in Backbone?',
                description: "Currently trying to have comments and votes for a SO like project.",
                tag_list: 'backbone, javascript, rails, postgresql')

Question.create(asker_id: 3, title: 'What are composite views in Backbone?',
                description: 'Is there a better way to break down views in Backbone?',
                tag_list: 'backbone, view-patterns')

Question.create(asker_id: 5, title: 'How can I use modals in Backbone?',
                description: 'Do I need to set events to trigger a modal show and have the modal itself in the template?',
                tag_list: 'foundation, html, css')

Question.create(asker_id: 2, title: 'How can I remove the n+1 queries made within jbuilder?',
                tag_list: 'postgresql, activerecord, rails, database')

Question.create(asker_id: 8, title: 'How can tags be implemented in Rails?',
                description: 'If there is only one model to attach multiple tags to, can I simply use a has-many relationship with just the tags?',
                tag_list: 'tags, rails, backbone')

Question.create(asker_id: 10, title: 'Should I use existing gems such as acts_as_taggable or acts_as_commentable?',
                description: 'I have a largish project and was wondering if usign an existing gem/library would be more efficient compared to rolling out my own system.',
                tag_list: 'ruby, rails')

Answer.create(question_id: 4, answerer_id: 2, body: 'It is any function that uses variables that were neither passed in or created within the function.')

Comment.create(commenter_id: 3, commentable_type: 'Question', commentable_id: 1, body: 'Do you have any examples that you want to have clarified?')

Badge.create(
  value: 1,
  title: 'Professional Beginner',
  description: 'Awarded for taking the first steps in becoming an awesome developer.',
  image_url: 'http://placehold.it/150x100')

Badge.create(
  value: 2,
  title: 'Unconscious Incompetence',
  description: 'Awarded for knocking a few questions out of the park.',
  image_url: 'http://placehold.it/150x100')

Badge.create(
  value: 3,
  title: 'Conscious Incompetence ',
  description: 'You understand that you understand nothing.',
  image_url: 'http://placehold.it/150x100')

Badge.create(
  value: 4,
  title: 'Conscious Competence',
  description: 'Answered and asked questions that have helped many individuals. People have started to ask you, directly, to answer their questions',
  image_url: 'http://placehold.it/150x100')

Badge.create(
  value: 5,
  title: 'Unconscious Competence',
  description: 'You have become one with the matrix. You can tackle most questions and dish out answers on the fly.',
  image_url: 'http://placehold.it/150x100')

Badge.create(
  value: 300,
  title: 'TenderLove',
  description: 'You have tackled on enough questions to be referenced by the community',
  image_url: 'http://placehold.it/150x100')

Badge.create(
  value: 450,
  title: 'Guido van Rossum',
  description: 'All the questions that you have asked and the answers you gave can all be compiled together to create a new programming language',
  image_url: 'http://placehold.it/150x100')

Badge.create(
  value: 600,
  title: 'Javascript',
  description: 'You prefer to be called ES6 from now on.',
  image_url: 'http://placehold.it/150x100')

Badge.create(
  value: 750,
  title: 'The CJ',
  description: 'You brought the internet to Americans all across the world. America.',
  image_url: 'http://placehold.it/150x100')

Badge.create(
  value: 1000,
  title: 'Superstar',
  description: "You've got it all. You can breathe now.",
  image_url: 'http://placehold.it/150x100')
