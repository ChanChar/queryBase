json.array! @badges.each do |badge|
  json.partial! 'api/badges/badge', badge: badge
end
