json.merge! answer.attributes
json.answered_at time_ago_in_words(answer.created_at)
json.answerer_username answer.answerer.username
json.answerer_image_url answer.answerer.image_url

if current_user.id == answer.answerer_id
  json.owned do
    json.extract! current_user, :id, :username
  end
end

json.score answer.score
vote = answer.votes.find_by(voter_id: current_user.id)
