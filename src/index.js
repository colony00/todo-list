import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './style.css';

document.body.textContent = "Hello World";

class TODO {
  constructor(project,name,description,timeOfCreation,checked) {
    this.project = project;
    this.name = name;
    this.description = description;
    this.timeOfCreation = timeOfCreation;
    this.checked =checked;
  }

  get timeSince() {
    return formatDistanceToNow(this.timeOfCreation)
  }
}

console.log(new TODO("Test Project","Test name","This is a TODO test",Date.now(),false))