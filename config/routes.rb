Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :books
      resources :forecasts
      resources :weather_data_histories
    end
  end
  resources :sessions, only: [:create]
  resources :users do
    collection do
      get :current_user_data
      get :user_resume
    end
  end
  


  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
