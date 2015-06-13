json.tag @tag
json.questions do
  json.array! @questions do |question|
    json.partial! 'api/questions/question', question: question
  end
end
