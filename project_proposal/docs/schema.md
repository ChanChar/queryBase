# Schema Information

## Questions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
asker_id    | integer   | not null, foreign key (references users)
title       | string    | not null
description | string    |
answered    | boolean   | not null, default: false
votes       | integer   | not null, default: 0
views       | integer   | not null, default: 0

## Answers
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
question_id | integer   | not null, foreign key
answerer_id | integer   | not null, foreign key (references users)
points      | integer   | not null, default: 0
best        | boolean   | not null, default: false


## Comments
### May be replaced by acts_as_commentable
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
commenter_id   | integer   | not null, foreign key (references users)
body           | string    | not null
type           | string    | not null
commentable_id | integer   | not null

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## taggings
### May be replaced by Acts-as-taggable-on
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
post_id     | integer   | not null, foreign key (references posts)
tag_id      | integer   | not null, foreign key (references tags)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
