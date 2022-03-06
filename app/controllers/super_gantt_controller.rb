class SuperGanttController < ApplicationController

  def index
  end

  def api_index
    top_level_projects = Project.where(:parent_id => nil, :status => 1).to_a()
    @result = []
    top_level_projects.each_with_index do |top_level_project, i|  
     project_entry = make_project_entry(top_level_project)
     @result.push(project_entry)
    end
    render json: @result
  end


  def get
  end

  def update
  end

  def make_project_entry(project)
    project_entry = Hash.new
    top_level_issues = Issue.where( :project_id => project.id, :parent_id => nil)
    project_entry = project.attributes
    project_entry["issues"]= make_nodes(top_level_issues)
    versions = Version.where(:project_id => project.id)
    project_entry["milesstones"] = versions.map(&:attributes)
    project_entry["sub_projects"]=[]
    sub_projects = Project.where(:parent_id => project.id).to_a()
    sub_projects.each_with_index do |sub_project, i| 
      project_entry["sub_projects"].push(make_project_entry(sub_project))
    end

    return project_entry
  end


  def make_nodes(_issues) 
    result=[]
    _issues_sorted = _issues.sort_by(&:status_id)
    _issues_sorted.each_with_index do |_issue, i| 
      result_elm=_issue.attributes
      result_elm["spent_hours"] = _issue.spent_hours
      result_elm["total_spent_hours"] = _issue.total_spent_hours
      result_elm["total_estimated_hours"] = _issue.total_estimated_hours
      children = get_child_issues(_issue.id)
      result_elm["sub_issues"] = children.to_a.length > 0 ? make_nodes(children) : []
      result.push(result_elm)
    end
    result
  end

  def get_child_issues(issue_id) 
    Issue.where(:parent_id => issue_id)
  end

end
