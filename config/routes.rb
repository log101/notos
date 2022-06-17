Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.htmlro
  get 'user/get', to: 'user#get'
  put 'user/set', to: 'user#set'

  root to: 'home#index'
end
