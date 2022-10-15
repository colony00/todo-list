export function TODO_DOM(todo) {
  const card = document.createElement("div");
  card.id = todo.id;
  
  const project = elementTextContent("div",todo.project,"projectName");
  const name = elementTextContent("div",todo.name,"name");
  const description = elementTextContent("div",todo.description,"description");
  const time = elementTextContent("div",todo.timeToDate, "dueDate");
  const priority = elementTextContent("div",todo.priority,"priority")
  const checkMark = elementTextContent("input",todo.checked,"checkbox");
  checkMark.type = "checkbox";
  const btnRemove = elementTextContent("button","Delete","btn-remove")

  if(todo.checked === true) {
    card.classList.add("checked");
    checkMark.checked = true;
  }
  card.classList.add('todo');

  card.append(project,name,description,time,priority,checkMark,btnRemove)
  return card;
}

export function createTODO_DOM(projectOptions) {
  const form = document.createElement("form");
  form.name = "create-todo";
  form.setAttribute('onsubmit','return false');
  // Maybe add some length requirements and so on. Option to select project from other projects,
  form.innerHTML =`
  <fieldset>
    <label for="project">Project</label>
    <input required type="text" name="project" id="project" list="projectName" />
      <datalist id="projectName">
        ${projectOptions}
      </datalist>
    <label for="name">Name of Project</label>
    <input required type="text" name="name" id="name" />
    <label for="description">Description</label>
    <input required type="text" name="description" id="description" />
    <div class="priority">
      <label for="high">HIGH</label>
      <input required type="radio" name="priority" id="high" value="HIGH" />
      <label for="MEDIUM">MEDIUM</label>
      <input required type="radio" name="priority" id="MEDIUM" value="MEDIUM" />
      <label for="low">LOW</label>
      <input required type="radio" name="priority" id="low" value="LOW" />
    </div>
    <label for="dueDate">Due Date</label>
    <input required type="date" name="dueDate" id="dueDate" />
  </fieldset>
  <button class="form-submit" type="submit">Add TODO</button>
  `;
  
  return form
}

export function projectButtons_DOM(projects) {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.append(elementTextContent("button","Home","home"))
  projects.forEach( p => {
    const pElem = elementTextContent("button",p,p);
    buttonContainer.append(pElem);
  })
  return buttonContainer
}

function elementTextContent(elementType,content,className) {
  const element = document.createElement(elementType);
  element.textContent = content;
  element.classList.add(className.replace(' ',''));
  return element;
}