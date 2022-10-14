import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

export class TODO {
  constructor(project,name,description) {
    this.project = project;
    this.name = name;
    this.description = description;
    this.timeOfCreation = Date.now();
    this.checked = false;
  }

  get id() {
    const _id = this.project + this.name;
    return _id.replaceAll(" ",'');
  }

  get timeSince() {
    return formatDistanceToNowStrict(this.timeOfCreation);
  }
}
