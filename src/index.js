import './style.css';
import {TODO} from './components/classes';
import {DOMcreateTODO, TODO_DOM} from './components/DOMs';

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
    console.log(_form);
    const _todo = new TODO(_form.project.value,_form.name.value,_form.description.value,Date(),false)
    listTODOS.addToTODOlist(_todo);
    displayUpdate();
  }
}

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
  }
}

listTODOS.addToTODOlist(new TODO("Test Project","Test name","This is a TODO test"));
listTODOS.addToTODOlist(new TODO("Test Project2","Test name2","This is a TODO test"));

displayUpdate()

function displayUpdate() {
  document.body.replaceChildren();

  listTODOS.list.forEach( todo => {
    document.body.appendChild(TODO_DOM(todo));
  })
  document.body.append(DOMcreateTODO())

  // Node selector and appending eventlisteners
  const _checkMarks = document.querySelectorAll(".checkbox");
  _checkMarks.forEach( mark => {
    mark.addEventListener('click', eventHandler.markDone)
  })
  const _btnRemove = document.querySelectorAll(".btn-remove");
  _btnRemove.forEach( btn => {
    btn.addEventListener('click', eventHandler.remove)
  })
  const _form = document.forms["create-todo"];
  _form.addEventListener('submit', eventHandler.getForm,false)
}
