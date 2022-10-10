import './style.css';
import {TODO} from './components/classes';
import {DOMcreateTODO} from './components/DOMs';

const listTODOS = {
  list: [],

  updateTODOlist: (todo) => {
    // Should find and replace the updaten TODO
  },

  addToTODOlist: (todo) => {
    list.push(todo);
  },

  findTODOfromID: (id) => {
    const foundTodo = listTODOS.filter(todo => {
      return todo.id === id;
    })
    return foundTodo
  }
}

listTODOS.list.push(new TODO("Test Project","Test name","This is a TODO test",Date.now(),false));

displayUpdate()

const checkMarks = document.querySelectorAll(".checkmark");
checkMarks.forEach( mark => {
  mark.addEventListener('click', eventHandler.markDone)
})

function displayUpdate() {
  document.body.replaceChildren();
  listTODOS.list.forEach( todo => {
    document.body.appendChild(DOMcreateTODO(todo));
  })
}

const eventHandler = {
  markDone: (e) => {
    const checkID = findID();
    const checkDOM = document.getElementById(e.target.parentNode.id)
    checkDOM.classList.add('checked')
    displayUpdate();
  }
}
