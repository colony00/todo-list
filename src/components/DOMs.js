export function TODO_DOM(todo) {
  const card = document.createElement("div");
  card.id = todo.id;
  
  // Kig evt på document.write();
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

export function DOMcreateTODO() {
  const form = document.createElement("form");
  form.name = "create-todo";
  form.setAttribute('onsubmit','return false');
  form.innerHTML =`
  <fieldset>
    <label for="project">Project</label>
    <input required type="text" name="project" id="project" />
    <label for="name">Name of Project</label>
    <input required type="text" name="name" id="name" />
    <label for="description">Description</label>
    <input required type="text" name="description" id="description" />
  </fieldset>
  <button class="form-submit" type="submit" >Add TODO</button>
  `;

  return form
}

function elementTextContent(elementType,content,className) {
  const element = document.createElement(elementType);
  element.textContent = content;
  element.classList.add(className);
  return element;
}