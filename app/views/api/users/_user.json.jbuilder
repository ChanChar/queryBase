json.extract! user, :id, :email, :created_at, :updated_at
json.points user.points

json.questions_asked do
  json.array!(user.questions) do |question|
    json.partial! 'api/questions/question', question: question
  end
end

json.answers do
  json.array!(user.answers) do |answer|
    json.merge! answer.attributes
  end
end

json.comments do
  json.array!(user.comments) do |comment|
    json.merge! comment.attributes
  end
end
