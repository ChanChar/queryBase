# Phase 2: Viewing Questions, Answers, Comments, User Profiles

## Rails
### Models

### Controllers
Api::QuestionsController (create, destroy, index, show, update)
Api::AnswersController (create, destroy, show, update)
Api::CommentsController (create, destroy, show, update)
Api::UsersController (create, destroy, show, update)

### Views
* questions/show.json.jbuilder

## Backbone
### Models
* Question (parses nested `answers` and `comments` associations)
* Answer (parses nested 'comments' association)
* Comment
* User

### Collections
* Questions
* Answers
* Comments?
* Users

### Views
* QuestionForm (for new/update)
* QuestionShow (composite view, contains AnswersShow subview)
* AnswersShow (composite view, contains CommentsShow subviews)
* AnswersShow
* CommentsShow
* UsersIndex (composite view, contains UserIndexItem subviews)
* UserShow
* UserIndexItem

## Gems/Libraries
'acts_as_commentable'
