mount ActionCable.server => '/cable'

Rails.application.routes.draw do
  get 'recordings/index'
  put 'recordings/create'
  get 'recordings/destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.htmlro
  get 'user/get', to: 'user#get'
  put 'user/set', to: 'user#set'

  get 'room/get', to: 'rooms#get'
  put 'room/set', to: 'rooms#set'


  root to: 'home#index'
end
