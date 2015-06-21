me = User.create(email: 'charleschanlee@gmail.com', username: 'TheCharlie', password: 'password', image_url: 'http://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/000/681/original/charlie_lee.jpg?1429734840')
jonsnow = User.create(email: 'jonsnow@thewall.com', username: 'JonnySnow', password: 'nothing', image_url: 'http://rs386.pbsrc.com/albums/oo307/AlbusSPotter/02-Jon-Snow-played-by-Kit-Harington-1.jpg~c200')
sample = User.create(email: 'curiousgeorge@monkey.com', username: 'C.George', password: 'banana', image_url: 'http://www-tc.pbskids.org/shell/images/content/show-bubbles/circle/curious-george.png')

[me, jonsnow, sample].each do |user|
  user.owned_badges.create({ badge_id: 1 })
end

150.times do
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

User.all.each do |user|
  user.votes.create({ votable_id: 1 + rand(6), votable_type: 'Question', value: 1 })
end

Badge.create(
  value: 0,
  title: 'Professional Beginner',
  description: 'Took the first step in becoming an awesome developer.',
  image_url: 'http://res.cloudinary.com/charliecloud/image/upload/v1434853728/logo_6_gjnlh9.png')

Badge.create(
  value: 10,
  title: 'Unconscious Incompetence',
  description: "You aren't confused by these questions but you're also not answering them either.",
  image_url: 'http://res.cloudinary.com/charliecloud/image/upload/v1434855926/logo_9_rgm2zz.png')

Badge.create(
  value: 25,
  title: 'Conscious Incompetence ',
  description: 'You understand that you understand very little.',
  image_url: 'http://res.cloudinary.com/charliecloud/image/upload/v1434854278/house-stark_sdn4tz.png')

Badge.create(
  value: 35,
  title: 'Conscious Competence',
  description: 'You have answered and asked questions that have helped many individuals. People have started to ask you, directly, to answer their questions.',
  image_url: 'http://res.cloudinary.com/charliecloud/image/upload/v1434752915/logo-4_opjffv.png')

Badge.create(
  value: 55,
  title: 'Unconscious Competence',
  description: "You have become one with the matrix. You can tackle most questions and dish out answers on the fly. You've considered starting a podcast to reach a wider audience.",
  image_url: 'http://res.cloudinary.com/charliecloud/image/upload/v1434752915/logo_3_nys0yo.png')

Badge.create(
  value: 100,
  title: 'TenderLove',
  description: 'You have tackled on enough questions to be referenced by the community. Most people enjoy your company and they love your cat(s).',
  image_url: 'http://res.cloudinary.com/charliecloud/image/upload/v1434755098/logo_1_m4apkk.png')

Badge.create(
  value: 150,
  title: 'Guido van Rossum',
  description: "All the questions that you have asked and the answers you gave can all be compiled together to create a new programming language. You've decided to call it Anaconda.",
  image_url: 'http://res.cloudinary.com/charliecloud/image/upload/v1434755098/logo_2_aabcl3.png')

Badge.create(
  value: 300,
  title: 'Javascript',
  description: 'You prefer to be called ES6 from now on. You wake up reciting the definition of a closure and you always callback.',
  image_url: 'http://res.cloudinary.com/charliecloud/image/upload/v1434755098/logo_4_cy4uhm.png')

Badge.create(
  value: 450,
  title: 'The CJ',
  description: 'You brought the internet to Americans all across the world. America. You also begin to feel old. Gee williker.',
  image_url: 'http://res.cloudinary.com/charliecloud/image/upload/v1434755098/logo_3_iui45z.png')

Badge.create(
  value: 500,
  title: 'Superstar',
  description: "You've got it all. You would take a breath of relief but you have programmed yourself to run on electrity.",
  image_url: 'http://res.cloudinary.com/charliecloud/image/upload/v1434854397/logo_8_tahxzc.png')
