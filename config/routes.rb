Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :books
      resources :forecasts

      resources :sessions, only: [:create]
      resources :users

      delete :logout, to: "sessions#logout"
      get :logged_in, to: "sessions#logged_in"
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
