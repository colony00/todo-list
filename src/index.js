import './style.css';
import {TODO} from './components/classes';
import {DOMcreateTODO} from './components/DOMs';

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

listTODOS.addToTODOlist(new TODO("Test Project","Test name","This is a TODO test",Date.now(),false));
listTODOS.addToTODOlist(new TODO("Test Project2","Test name2","This is a TODO test",Date.now(),false));

displayUpdate()

function displayUpdate() {
  document.body.replaceChildren();

  listTODOS.list.forEach( todo => {
    document.body.appendChild(DOMcreateTODO(todo));
  })

  const _checkMarks = document.querySelectorAll(".checkbox");
  _checkMarks.forEach( mark => {
    mark.addEventListener('click', eventHandler.markDone)
  })
  const _btnRemove = document.querySelectorAll(".btn-remove");
  _btnRemove.forEach( btn => {
    btn.addEventListener('click', eventHandler.remove)
  })
}
