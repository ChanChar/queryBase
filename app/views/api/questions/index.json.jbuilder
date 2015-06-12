json.array!(@questions) do |question|
  # json.merge! question.attributes
  # json.votes question.votes.length
  # json.answers do
  #   json.array!(question.answers) do |answer|
  #     json.merge! answer.attributes
  #   end
  # end

  json.partial! 'api/questions/question', question: question
end
