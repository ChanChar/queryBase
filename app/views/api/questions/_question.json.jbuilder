json.merge! question.attributes
json.score question.score
json.asked_at time_ago_in_words(question.created_at)

json.tag_list question.tags
json.asker do
  json.extract! User.find(question.asker_id), :username
end

if @vote
  json.vote do
    json.merge! @vote.attributes
  end
end

json.comments do
  json.array!(question.comments) do |comment|
    json.merge! comment.attributes
  end
end

json.answers do
  json.array!(question.answers) do |answer|
    json.merge! answer.attributes

    if current_user.id == answer.answerer_id
      json.owned do
        json.extract! current_user, :id, :username
      end
    end

    json.score answer.score
    vote = answer.votes.find_by(voter_id: current_user.id)

    if vote
      json.vote do
        json.merge! vote.attributes
      end
    end

    json.comments do
      json.array!(answer.comments) do |comment|
        json.merge! comment.attributes
      end
    end
  end
end
