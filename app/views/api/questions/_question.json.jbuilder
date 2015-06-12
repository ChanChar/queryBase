json.merge! question.attributes
json.votes question.score

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

    json.comments do
      json.array!(answer.comments) do |comment|
        json.merge! comment.attributes
      end
    end
  end
end
