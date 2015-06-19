json.page_number params[:page]
json.total_pages @users.total_pages

json.models do
  json.array!(@users) do |user|
    json.partial! 'api/users/user', user: user
  end
end
