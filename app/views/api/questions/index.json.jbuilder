json.array!(@questions) do |question|
  json.merge! question.attributes
  json.answers do
    json.array!(question.answers) do |answer|
      json.merge! answer.attributes
    end
  end
end
