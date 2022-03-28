class SuperGanttController < ApplicationController
  def index
  end

  def api_index
    top_level_projects = Project.where(:parent_id => nil, :status => 1).to_a()
    project_custom_fields = CustomField.where(:type => "ProjectCustomField")
    #project_custom_value = CustomValues.where(:customized_type =>"Project")
    result=[]
    top_level_projects.each do |top_level_project|
      result_elm = top_level_project.attributes
      project_custom_fields.each do |project_custom_field|
        custom_field = CustomValue.find_by(:customized_id => top_level_project.id, :custom_field_id=>project_custom_field.id)
        result_elm[project_custom_field.name] = custom_field.blank? ? nil : custom_field.value
      end
      result.push(result_elm)
    end

    render json: result
  end

  def api_project
    project = make_project_entry(params[:id])
    #render json: @project
    render json: project
  end

  def get
  end

  def update
  end

  def make_project_entry(project_id)
    project = Project.find(project_id).attributes.to_h()
    top_level_issues = Issue.where(:project_id => project_id, :parent_id => nil)
    
    project["issues"] = make_nodes(top_level_issues)
    versions = Version.where(:project_id => project_id)
    project["milestones"] = versions.map(&:attributes)
    project["sub_projects"] = []
    sub_projects = Project.where(:parent_id => project_id).to_a()
    sub_projects.each_with_index do |sub_project, i|
      project["sub_projects"].push(make_project_entry(sub_project.id))
    end

    return project
  end

  def make_nodes(_issues)
    result = []
    _issues_sorted = _issues.sort_by(&:status_id)
    _issues_sorted.each_with_index do |_issue, i|
      result_elm = _issue.attributes
      total_estimated_hours = _issue.total_estimated_hours
      total_spent_hours = _issue.total_spent_hours
      fixed_version = _issue.fixed_version
      parent_due_date = _issue.parent.blank? ? nil : _issue.parent.due_date

      # set due date
      if result_elm["due_date"] == nil  # no due date
        if total_estimated_hours != nil # there is an hour estimation
          remaining_hours = total_estimated_hours - total_spent_hours
          result_elm["due_date"] = Date.today + (remaining_hours / 7) # calculate due date
        elsif fixed_version != nil && fixed_version.effective_date != nil # there is an assigned version
          result_elm["due_date"] = fixed_version.effective_date #take due date of version
        elsif _issue.parent != nil && parent_due_date != nil # is there a parent task with a due date
        result_elm["due_date"] = parent_due_date # use due date of parent
        else # no idea what to do
          result_elm["due_date"] = Date.today #set due date to today
        end
      end

      result_elm["pending"] = result_elm["due_date"] <= Date.today
      result_elm["due_date"] = result_elm["pending"] ? Date.today : result_elm["due_date"]

      #additional infos
      result_elm["spent_hours"] = _issue.spent_hours
      result_elm["total_spent_hours"] = total_spent_hours
      result_elm["total_estimated_hours"] = total_estimated_hours

      result_elm["fixed_version"] = fixed_version
      children = get_child_issues(_issue.id)
      result_elm["sub_issues"] = children.to_a.length > 0 ? make_nodes(children) : []
      result.push(result_elm)
    end
    result
  end

  def get_child_issues(issue_id)
    Issue.where(:parent_id => issue_id, :closed_on => nil)
  end

end
