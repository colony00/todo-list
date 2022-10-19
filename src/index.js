import './style.css';
import {TODO} from './components/classes';
import {createTODO_DOM, projectButtons_DOM, expandedTODO_DOM, todoDOM, columnNamesDOM} from './components/DOMs';

// How can this be moved to another file. No need to have it in the main file.
const eventHandler = {
  markDone: (e) => {
    const _todo = listTODOS.returnTODOfromID(e.target.parentNode.id);
    _todo.checked = !_todo.checked;
    displayUpdate();
  },

  remove: (e) => {
    const _todo = listTODOS.returnTODOfromID(e.target.parentNode.id);
    listTODOS.removeTODO(_todo.id)
    displayUpdate();
  },

  getForm: (e) => {
    const _form = e.target;
    console.log(_form.dueDate);
    const _todo = new TODO(_form.project.value,_form.name.value,_form.description.value,new Date(_form.dueDate.value),_form.priority.value)
    listTODOS.addToTODOlist(_todo);
    displayUpdate();
  },

  addProjectToURL: (e) => {
    const project = e.target.textContent
    if(project !== 'Home') {
      const urlParams = new URLSearchParams(window.location.search)
      urlParams.set('project',project)
      window.location.search = urlParams
      return
    }
    window.location.search = ''
  },

  expandTodo: (e) => {
    const _todo = listTODOS.returnTODOfromID(e.target.parentNode.id);
    e.target.parentNode.parentNode.replaceChild(expandedTODO_DOM(_todo),e.target.parentNode);
    events()
  },

  editTodo: (e) => {
    const _todo = listTODOS.returnTODOfromID(e.target.parentNode.id);
    e.target.parentNode.parentNode.replaceChild(createTODO_DOM([],_todo),e.target.parentNode);
    events()
  }
}

// Make this a class and move it to another file.
const listTODOS = {
  list: [],

  removeTODO: (id) => {
    const todoIndex = listTODOS.list.findIndex(todo => {
      todo.id === id;
    })
    listTODOS.list.splice(todoIndex,1);
  },

  addToTODOlist: (todo) => {
    listTODOS.list.push(todo);
  },

  returnTODOfromID: (id) => {
    const foundTodo = listTODOS.list.find(todo => {
      return todo.id === id;
    })
    return foundTodo
  },

  returnTODOSinProject: (project) => {
    const projectsTODOS = listTODOS.list.filter( todo => todo.project === project)
    return projectsTODOS;
  },

  returnProjectNames: () => {
    const projects = [];
    listTODOS.list.forEach( todo => {
      if(!projects.includes(todo.project)) {
        projects.push(todo.project);
      }
    })
    return projects;
  }
}

listTODOS.addToTODOlist(new TODO("Test Project","Test name","This is a TODO test",new Date('1995-12-17T03:24:00'),"HIGH"));
listTODOS.addToTODOlist(new TODO("Test Project2","Test name2","This is a TODO test",new Date('1995-12-17T03:24:00'),"LOW"));

displayUpdate()

function displayUpdate() {
  document.body.replaceChildren();

  let datalistOptions;
  let project;
  const urlParams = window.location.search
  if(!urlParams) {
    project = 'default';
    const _datalistOptions = listTODOS.returnProjectNames()
    datalistOptions = _datalistOptions.map( p => {
      return `<option value="${p}" >`;
    })
    datalistOptions = datalistOptions.join('')
  } else {
    project = urlParams.replace('?project=','').replace('+',' ')
    datalistOptions = `<option value="${project}" >`;
  }
  
  const title = document.createElement("h1");
  title.textContent = project;
  document.body.append(title)

  const todoContainer = document.createElement("div")
  todoContainer.classList.add("todo-container");
  todoContainer.append(columnNamesDOM())

  const todoList = project === 'default' ? listTODOS.list : listTODOS.returnTODOSinProject(project)
  todoList.forEach( todo => {
    todoContainer.appendChild(todoDOM(todo));
  })

  document.body.append(projectButtons_DOM(listTODOS.returnProjectNames()),title,todoContainer)

  // Node selector and appending eventlisteners
  events()
}

function events() {
  const _edit = document.querySelectorAll(".edit");
  _edit.forEach( edit => {
    edit.addEventListener('click', eventHandler.editTodo)
  });
  const _expand = document.querySelectorAll(".expand");
  _expand.forEach( edit => {
    edit.addEventListener('click', eventHandler.expandTodo)
  })
  const _checkMarks = document.querySelectorAll(".checkbox");
  _checkMarks.forEach( mark => {
    mark.addEventListener('click', eventHandler.markDone)
  })
  const _btnRemove = document.querySelectorAll(".btn-remove");
  _btnRemove.forEach( btn => {
    btn.addEventListener('click', eventHandler.remove)
  })
  try{
    const _form = document.forms["create-todo"];
    _form.addEventListener('submit', eventHandler.getForm,false)
  } catch {
    console.log('No form')
  }
  const _projects = document.querySelectorAll(".button-container button")
  _projects.forEach( btn => {
    btn.addEventListener('click', eventHandler.addProjectToURL)
  })
}