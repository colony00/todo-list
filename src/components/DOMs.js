export function DOMcreateTODO(todo) {
  const card = document.createElement("div");
  card.id = todo.id;
  
  const project = elementTextContent("div",todo.project,"projectName");
  const name = elementTextContent("div",todo.name,"name");
  const description = elementTextContent("div",todo.description,"description");
  const time = elementTextContent("div",todo.timeSince, "timeSince");
  const checkMark = elementTextContent("input",todo.checked,"checkbox");
  checkMark.type = "checkbox";
  const btnRemove = elementTextContent("button","Delete","btn-remove")

  if(todo.checked === true) {
    card.classList.add("checked");
    checkMark.checked = true;
  }
  card.classList.add('todo');

  card.append(project,name,description,time,checkMark,btnRemove)
  return card;
}

function elementTextContent(elementType,content,className) {
  const element = document.createElement(elementType);
  element.textContent = content;
  element.classList.add(className);
  return element;
}