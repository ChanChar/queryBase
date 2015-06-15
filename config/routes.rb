Rails.application.routes.draw do

  root to: 'static_pages#root'

  resources :users
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :questions, except: [:new]
    resources :answers, only: [:create, :show, :edit, :destroy]
    resources :comments, only: [:create, :show, :edit, :destroy]
    resources :badges, only: [:index, :show, :create]
    resources :votes, only: [:create, :destroy, :update]
    resources :tags, only: [:index, :show]
    resources :views, only: [:create]
  end
end
