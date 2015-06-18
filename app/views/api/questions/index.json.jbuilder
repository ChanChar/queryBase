json.page_number params[:page]
json.total_pages @questions.total_pages

json.models do
  json.array!(@questions) do |question|
    json.partial! 'api/questions/question', question: question
  end
end
