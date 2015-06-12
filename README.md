# queryBase

[Heroku link][heroku]

[heroku]: http://querybase.herokuapp.com/

## Minimum Viable Product
queryBase is a clone of Stack Overflow built on Rails and Backbone. Users can:

- [x] Create an account
- [x] Create sessions (log in)
- [x] Post questions (title, description, tags)
- [ ] Answer questions (and choose the 'best' answer)
- [x] Post comments to question or answers
- [ ] View questions, answers, comments, user profiles
- [ ] Follow questions
- [ ] Search for questions by tag, keyword (eg. title)
- [ ] Earn badges and/or points by asking and/or answering questions

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./project_proposal/docs/views.md
[schema]: ./project_proposal/docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Question/Answer/Comments Models (~1-2 day)
Set up user authentication (sessions, users) using best practices. In addition
will create a basic implementation of the question and answer features. Create a
polymorphic association for comments or may use the `acts_as_commentable` gem.

[Details][phase-one]

### Phase 2: Viewing Questions, Answers, Comments, User Profiles (~2 days)
Add the needed API endpoints/routes and create the Backbone models/collection,
views and templates so that users can post questions, answer questions, and post
comments. In addition create the ability to delete those features. Also add the
ability to vote on questions.

[Details][phase-two]

### Phase 3: Editing, Displaying, and Tagging Questions (~3 days)

Create the tagging model or use the 'Acts-as-taggable-on' gem. Add the necessary
changes to the questions model & templates to support tagging. Add support to
accept markdown in post description. May use the `markdown-rails` gem. Will have a
small display box to show formatted text. Display answers and comments for the question.

[Details][phase-three]

### Phase 4: Search Functionality (~1-2 days)

Add a search bar which returns a view with search results. Search bar will also
be appended with a dropdown list to specify feature to search by (tags, keyword, etc).
Backbone view will be a view that will replace the content page.

[Details][phase-four]

### Phase 5: Gamification - Badges & Points (~2 days)

Add point and badge system for users. Adjust the user model to support systems,
update user profile page to display points/badges, etc.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Follow lists of questions by topic/tag.
- [ ] Look at unanswered, top, featured questions by week or month
- [ ] Report/Flag questions, comments, answers
- [ ] Pagination/infinite scroll
- [ ] Activity history using d3.js (points, question views, etc.)
- [ ] Social media sharing
- [ ] Anonymous user option when asking questions
- [ ] User pictures, profile page header image background
- [ ] Data analysis (most popular tags, trends, etc)

[phase-one]: ./project_proposal/docs/phases/phase1.md
[phase-two]: ./project_proposal/docs/phases/phase2.md
[phase-three]: ./project_proposal/docs/phases/phase3.md
[phase-four]: ./project_proposal/docs/phases/phase4.md
[phase-five]: ./project_proposal/docs/phases/phase5.md
