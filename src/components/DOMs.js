import format from 'date-fns/format'

export function expandedTODO_DOM(todo) {
  const card = document.createElement("div");
  card.id = todo.id;
  
  const project = elementTextContent("div",todo.project,"projectName");
  const name = elementTextContent("div",todo.name,"name");
  const description = elementTextContent("div",todo.description,"description");
  const time = elementTextContent("div",todo.timeToDate, "dueDate");
  const priority = elementTextContent("div",todo.priority,"priority")
  const checkMark = elementTextContent("input",todo.checked,"checkbox");
  checkMark.type = "checkbox";
  const btnRemove = elementTextContent("button","Delete","btn-remove");
  const btnEdit = elementTextContent("button","Edit","edit")

  if(todo.checked === true) {
    card.classList.add("checked");
    checkMark.checked = true;
  }
  card.classList.add('todo','edit');
  //You should be able to edit this
  card.append(project,name,description,time,priority,checkMark,btnEdit,btnRemove)
  return card;
}

const emptyTodo = {
  project: '',
  name: '',
  description: '',
  priority: '',
  dueDate: Date.now(),
  checked: false
}

export function createTODO_DOM(projectOptions,prev=emptyTodo) {
  const form = document.createElement("form");
  form.name = "create-todo";
  form.setAttribute('onsubmit','return false');
  // Maybe add some length requirements and so on. Option to select project from other projects,
  form.innerHTML =`
  <fieldset>
    <label for="project">Project:</label>
    <input required type="text" name="project" id="project" list="projectName" value="${prev.project}" />
      <datalist id="projectName">
        ${projectOptions}
      </datalist>
    <label for="name">Name of Project:</label>
    <input required type="text" name="name" id="name" value="${prev.name}"/>
    <label for="description">Description:</label>
    <input required type="text" name="description" id="description" value="${prev.description}"/>
    <div class="priority">
      <label for="priority">Priority:</label>
      <label for="high">HIGH</label>
      <input required type="radio" name="priority" id="high" value="HIGH" checked="${prev.priority === 'HIGH'}"/>
      <label for="MEDIUM">MEDIUM</label>
      <input required type="radio" name="priority" id="MEDIUM" value="MEDIUM" checked="${prev.priority === 'MEDIUM'}"/>
      <label for="low">LOW</label>
      <input required type="radio" name="priority" id="low" value="LOW" checked="${prev.priority === 'LOW'}"/>
    </div>
    <label for="dueDate">Due Date:</label>
    <input required type="date" name="dueDate" id="dueDate" value="${format(prev.dueDate,'yyyy-MM-dd')}"/>
    <button class="form-submit" type="submit">Save</button>
  </fieldset>
  `;
  
  return form
}

export function todoDOM(todo) {
  const card = document.createElement("div");
  card.id = todo.id;
  card.classList.add(todo.priority);
  
  const name = elementTextContent("div",todo.name,"name");
  const description = elementTextContent("div",todo.description,"description");
  const time = elementTextContent("div",todo.timeToDate, "dueDate");
  const checkMark = elementTextContent("input",todo.checked,"checkbox");
  checkMark.type = "checkbox";
  const edit = elementTextContent("div","expand","expand");

  if(todo.checked === true) {
    card.classList.add("checked");
    checkMark.checked = true;
  }
  card.classList.add('todo','small');

  card.append(name,description,time,edit,checkMark)
  return card;
}

export function columnNamesDOM() {
  const card = document.createElement("div");
  card.classList.add("column-names");
  
  const name = elementTextContent("div","Name:","name");
  const description = elementTextContent("div","Description:","description");
  const time = elementTextContent("div","Due Date in:", "dueDate");
  const checkMark = elementTextContent("input","","checkbox");

  card.classList.add('todo','small');

  card.append(name,description,time,checkMark)
  return card;
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