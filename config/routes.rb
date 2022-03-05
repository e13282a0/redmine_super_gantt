# Plugin's routes
# See: http://guides.rubyonrails.org/routing.html
#get 'polls', to: 'polls#index'
#post 'post/:id/vote', to: 'polls#vote'
get 'super_gantt', to: 'super_gantt#index'
#get 'test', to: 'super_gantt#test'
get '/super_gantt/api/index', to: 'super_gantt#api_index'