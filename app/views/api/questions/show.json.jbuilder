json.extract!(@question, :title, :asker_id, :description, :answered,
              :votes, :views, :created_at, :updated_at)

json.comments do
  json.array!(@question.comments)
end

json.answers do
  json.array!(@question.answers) do |answer|
    json.merge! answer.attributes

    json.comments do
      json.array!(answer.comments) do |comment|
        json.merge! comment.attributes
      end
    end
  end
end
