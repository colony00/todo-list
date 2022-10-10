import './style.css';
import {TODO} from './components/classes';
import {DOMcreateTODO} from './components/DOMs';

const eventHandler = {
  markDone: (e) => {
    const _todo = listTODOS.findTODOfromID(e.target.parentNode.id);
    _todo.checked = !_todo.checked;
    displayUpdate();
  }
}

const listTODOS = {
  list: [],

  updateTODOlist: (id,key,updateValue) => {
    // This may not be needed.
  },

  addToTODOlist: (todo) => {
    listTODOS.list.push(todo);
  },

  findTODOfromID: (id) => {
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
  
  checkMarksHandler();
}

function checkMarksHandler() {
  const _checkMarks = document.querySelectorAll(".checkbox");
  _checkMarks.forEach( mark => {
    mark.addEventListener('click', eventHandler.markDone)
  })
  return _checkMarks;
}