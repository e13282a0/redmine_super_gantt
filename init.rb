Redmine::Plugin.register :redmine_super_gantt do
  name 'Redmine Super Gantt plugin'
  author 'Christian Rust'
  description 'This is an improved gantt plugin for redmine'
  version '0.0.1'
  url 'https://github.com/e13282a0/redmine_gantt/'
  author_url 'https://github.com/e13282a0'
  menu :application_menu, :super_gantt, { controller: 'super_gantt', action: 'index' }, caption: 'Super Gantt'
  #permission :super_gantt, { :super_gantt => [:index] }, :public => true
  #menu :project_menu, :super_gantt, { controller: 'super_gantt', action: 'index' }, caption: 'Super Gantt', :param => :project_id
end
