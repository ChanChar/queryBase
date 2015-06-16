if current_user.id == comment.commenter_id
  json.owned do
    json.extract! current_user, :id, :username
  end
end

json.commenter comment.commenter.username
json.commenter_id comment.commenter.id
json.merge! comment.attributes
