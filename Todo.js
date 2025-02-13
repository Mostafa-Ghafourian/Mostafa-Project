const addelem = document.getElementById('add');
const removeelem = document.getElementById('remove');
const editelem = document.getElementById('edit');
const selectelem = document.getElementById('select');
const mohemelem = document.getElementById('mohem');
const KheiliMohemelem = document.getElementById('kheili-mohem');
const addielem = document.getElementById('addi');
const AnjamShodehelem = document.getElementById('AnjamShodehe');
const removeTickElem = document.getElementById('remove-tick');

let todos = [];

function loadTodos() {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.forEach(todoData => {
        let newdiv = createTodoElement(todoData.text);
        if (todoData.selected) {
            newdiv.classList.add('selected');
            newdiv.querySelector('span').style.display = 'inline';
        }
        if (todoData.color) {
            newdiv.style.color = todoData.color;
        }
        if (todoData.anjamShodeh) {
            let tick = document.createElement('span');
            tick.textContent = ' Anjam Shodeh'; 
            tick.classList.add('tick');
            newdiv.appendChild(tick);
        }
        document.body.append(newdiv);
        todos.push(newdiv);
    });
}

function createTodoElement(todoText) {
    let newdiv = document.createElement('div');
    newdiv.textContent = todoText;
    newdiv.classList.add('todo-item');

    let selectedLabel = document.createElement('span');
    selectedLabel.textContent = ' selected';
    selectedLabel.style.display = 'none';
    selectedLabel.style.fontSize = 'small';
    newdiv.appendChild(selectedLabel);

    newdiv.addEventListener('click', function() {
        newdiv.classList.toggle('selected');
        if (newdiv.classList.contains('selected')) {
            selectedLabel.style.display = 'inline';
        } else {
            selectedLabel.style.display = 'none';
        }
    });
    newdiv.style.marginLeft = '500px';

    return newdiv;
}

function saveTodos() {
    const todosData = todos.map(todo => {
        return {
            text: todo.textContent.replace(' selected', ''),
            selected: todo.classList.contains('selected'),
            color: todo.style.color,
            anjamShodeh: !!todo.querySelector('.tick')
        };
    });
    localStorage.setItem('todos', JSON.stringify(todosData));
}

addelem.addEventListener('click', AddTodo);
removeelem.addEventListener('click', RemoveTodo);
editelem.addEventListener('click', EditTodo);
selectelem.addEventListener('click', selectTodo);
mohemelem.addEventListener('click', Mohem);
KheiliMohemelem.addEventListener('click', KeiliMohem);
addielem.addEventListener('click', Addi);
AnjamShodehelem.addEventListener('click', AnjamShodeh);
removeTickElem.addEventListener('click', removeTick);

function selectTodo() {
    todos.forEach(todo => {
        todo.classList.remove('selected');
        const selectedLabel = todo.querySelector('span');
        selectedLabel.style.display = 'none';
    });
}

function AddTodo() {
    let newevent = prompt('New Todo: ');
    if (newevent) {
        let newdiv = createTodoElement(newevent);
        document.body.append(newdiv);
        todos.push(newdiv);
        saveTodos();
    }
}

function RemoveTodo() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) { 
            todo.remove();
        }
    });
    todos = todos.filter(todo => !todo.classList.contains('selected'));
    saveTodos();
}

function EditTodo() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            let newtodo = prompt('Input new todo: ');
            if (newtodo) {
                todo.firstChild.textContent = newtodo;
            }
        }
    });
    saveTodos();
}

loadTodos();

function Mohem() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            todo.style.color = 'aqua';
        }
    });
    saveTodos();
}

function KeiliMohem() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            todo.style.color = 'red';
        }
    });
    saveTodos();
}

function Addi() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            todo.style.color = 'white';
        }
    });
    saveTodos();
}

function AnjamShodeh() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            if (!todo.querySelector('.tick')) {
                let tick = document.createElement('span');
                tick.textContent = ' Anjam Shodeh'; 
                tick.classList.add('tick');
                todo.appendChild(tick); 
            }
        }
    });
    saveTodos();
}

function removeTick() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            const tick = todo.querySelector('.tick');
            if (tick) {
                tick.remove();
            }
        }
    });
    saveTodos();
}