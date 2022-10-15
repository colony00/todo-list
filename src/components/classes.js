import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

// Add dueDate and priority.
export class TODO {
  constructor(project,name,description,dueDate,priority) {
    this.project = project;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.checked = false;
    this.priority = priority;
  }

  get id() {
    const _id = this.project + this.name;
    return _id.replaceAll(" ",'');
  }

  get timeToDate() {
    return formatDistanceToNowStrict(this.dueDate);
  }
}
