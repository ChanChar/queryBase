Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users
  resource :session

  namespace :api, defaults: { format: :json } do
    resources :questions, except: [:new]
    resources :answers, only: [:create, :update, :destroy]
    resources :comments, only: [:create, :update, :destroy]
  end
end
