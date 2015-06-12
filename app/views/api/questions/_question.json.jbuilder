json.merge! question.attributes
json.score question.score
json.tag_list question.tags
json.asker do
  json.extract! User.find(question.asker_id), :email
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
