class SuperGanttController < ApplicationController

  def index

  end

  def api_index
    top_level_projects = Project.where(:parent_id => nil, :status => 1).to_a()
    @result = []
    top_level_projects.each_with_index do |top_level_project, i|  
     project_entry = Hash.new
     top_level_issues = Issue.where( :project_id => top_level_project.id, :parent_id => nil)
     project_entry = top_level_project.attributes
     project_entry["issues"]= make_nodes(top_level_issues)
     versions = Version.where(:project_id => top_level_project.id)
     project_entry["milesstones"] = versions.map(&:attributes)
     #sub_projects = Project.where(:parent_id => top_level_project.id, status => 1).to_a()
     @result.push(project_entry)
    end
    render json: @result
  end

  def get
  end

  def update
  end


  def make_nodes(_issues) 
    result=[]
    _issues_sorted = _issues.sort_by(&:status_id)
    _issues_sorted.each_with_index do |_issue, i| 
      result_elm=_issue.attributes
      result_elm["spent_hours"] = _issue.spent_hours
      result_elm["total_spent_hours"] = _issue.total_spent_hours
      result_elm["total_estimated_hours"] = _issue.total_estimated_hours
      #result_elm=Hash.new
      #result_elm["name"]=_issue.subject
      #result_elm["value"]=_issue.total_spent_hours
      #result_elm["status"]= _issue.status_id.blank? ? nil : IssueStatus.find(_issue.status_id)["name"]
      #result_elm["is_open"]= _issue.status_id.blank? ? true : _issue.status_id < 2
      #result_elm["is_closed"]= _issue.status_id.blank? ? nil : IssueStatus.find(_issue.status_id)["is_closed"]
      #result_elm["assignee"] = _issue.assigned_to.blank? ? nil : _issue.assigned_to["lastname"]
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
