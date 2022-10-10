import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

export class TODO {
  constructor(project,name,description,timeOfCreation,checked) {
    this.project = project;
    this.name = name;
    this.description = description;
    this.timeOfCreation = timeOfCreation;
    this.checked = checked;
  }

  get id() {
    const _id = this.project + this.name;
    return _id.replaceAll(" ",'');
  }

  get timeSince() {
    return formatDistanceToNowStrict(this.timeOfCreation);
  }
}
