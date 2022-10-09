import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import './style.css';

class TODO {
  constructor(project,name,description,timeOfCreation,checked) {
    this.project = project;
    this.name = name;
    this.description = description;
    this.timeOfCreation = timeOfCreation;
    this.checked = checked;
  }

  get timeSince() {
    return formatDistanceToNowStrict(this.timeOfCreation);
  }
}

const firstTODO = new TODO("Test Project","Test name","This is a TODO test",Date.now(),false);
console.log(firstTODO)

document.body.appendChild(DOMcreateTODO(firstTODO))

function DOMcreateTODO(todo) {
  const card = document.createElement("div");
  const project = elementTextContent("div",todo.project,"projectName");
  const name = elementTextContent("div",todo.name,"name");
  const description = elementTextContent("div",todo.description,"description");
  const time = elementTextContent("div",todo.timeSince, "timeSince");

  card.classList.add('todo');

  card.append(project,name,description,time)
  return card;
}

function elementTextContent(elementType,content,className) {
  const element = document.createElement(elementType);
  element.textContent = content;
  element.classList.add(className);
  return element;
}
