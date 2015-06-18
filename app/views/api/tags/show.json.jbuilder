json.tag @tag
json.page_number params[:page]
# json.page_number 1
json.total_pages @questions.total_pages

json.questions do
  json.page_number params[:page]
  json.array! @questions do |question|
    json.partial! 'api/questions/question', question: question
  end
end
