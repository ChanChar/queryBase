json.merge! question.attributes
json.score question.score
json.asked_at time_ago_in_words(question.created_at)

json.has_best question.answers.any? { |answer| answer.best }

json.tag_list question.tags
json.asker do
  json.extract! User.find(question.asker_id), :id, :username, :image_url
end

if current_user.id == question.asker_id
  json.owned do
    json.extract! current_user, :id, :username
  end
end

if @vote
  json.vote do
    json.merge! @vote.attributes
  end
end

json.comments do
  json.array!(question.comments) do |comment|
    json.partial! 'api/comments/comment', comment: comment
  end
end

json.answers do
  json.array!(question.answers) do |answer|
    json.partial! 'api/answers/answer', answer: answer
    vote = answer.votes.find_by(voter_id: current_user.id)

    if vote
      json.vote do
        json.merge! vote.attributes
      end
    end

    json.comments do
      json.array!(answer.comments) do |comment|
        json.partial! 'api/comments/comment', comment: comment
      end
    end
  end
end
