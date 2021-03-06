QueryBase is a Q&A site made for students, aspiring developers and professionals to discuss computer programming. Ask questions, get answers and earn points.

[Website link][website]

[website]: http://querybase.me

Easily post questions. Github flavored markdown fully supported.
![question-make](http://res.cloudinary.com/charliecloud/image/upload/v1434947928/charblog/Screen_Shot_2015-06-21_at_9.33.12_PM.png)

Quickly search through all questions.
![question-search](http://res.cloudinary.com/charliecloud/image/upload/v1435078675/charblog/Screen_Shot_2015-06-23_at_9.56.54_AM.png)

View all questions with a specific tag.
![tag-search](http://res.cloudinary.com/charliecloud/image/upload/v1435078727/charblog/Screen_Shot_2015-06-23_at_9.58.30_AM.png)

Answer questions & earn points from other users.
![earn-points](http://res.cloudinary.com/charliecloud/image/upload/v1435078787/charblog/Screen_Shot_2015-06-23_at_9.59.28_AM.png)

Earn badges when hitting point milestones.
![earn-badges](http://res.cloudinary.com/charliecloud/image/upload/v1435078872/charblog/Screen_Shot_2015-06-23_at_10.00.58_AM.png)

## Ask, answer, earn.
---
# queryBase Project Proposal

## Minimum Viable Product
queryBase is a Stack Overflow inspired project built on Rails and Backbone. Users can:

- [x] Create an account
- [x] Create sessions (log in)
- [x] Post questions (title, description, tags)
- [x] Answer questions (and choose the 'best' answer)
- [x] Post comments to question or answers
- [x] View questions, answers, comments, user profiles
- [ ] Follow questions
- [x] Search for questions by tag, keyword (eg. title)
- [x] Earn badges and/or points by asking and/or answering questions

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
- [x] Pagination/infinite scroll
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
