json.extract! user, :id, :username

json.image_url user.image_url || 'http://res.cloudinary.com/charliecloud/image/upload/v1434941598/logo_cqo72p.png'
json.owned user.id == current_user.id

json.tour_enabled user.created_at > 5.minutes.ago

json.points user.points
json.question_points user.question_points_total
json.answer_points user.answer_points_total
json.num_badges user.badges.length

json.questions_asked do
  json.array!(user.questions) do |question|
    json.partial! 'api/questions/question', question: question
  end
end

json.earned_badges do
  json.array!(user.badges) do |badge|
    json.partial! 'api/badges/badge', badge: badge
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
