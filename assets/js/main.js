/*
*TODO list by Chidiebere Ekennia , Backend Developer at Genesys
*/
//VARIABLE and DOM DECLARATIONS:
let add_btn = document.querySelector('#add-btn');
let task_input = document.querySelector('#task-input');
let task_form = document.querySelector('form.add-form');
let task_list = document.querySelector('#task-display');
let task_counter = document.querySelector('#task-count');
let pending_counter = document.querySelector('#pending-count');

//Functions for adding tasks:
function handleAddTask(task) {
	let task_error = addTaskError(task);
	if (task_error === false) {
		addTask(task);
		task_input.value = '';
	}else {
		displayAddTaskError(task_error);
	}
}
function displayAddTaskError(error) {
	alert(error);
}

function addTask (task) {
	addTaskToList(formatted_text(task));
	increaseCounter(task_counter);
	increaseCounter(pending_counter);
}
function addTaskToList (task) {
	let task_list_item = 
		`<li class="col-12 d-flex flex-wrap list-group-item paper-box-shadow">
			<div class='col px-0'>
				<span class='task'>${task}</span>
			</div>
			<div class='ml-auto row'>
				<div class='' onclick="toggleCrossTask(this);">
					<img class='px-0 btn-svg check-img' src='./assets/imgs/svgs/checkbox-2.svg' title='Check This Task'>
				</div>
				<div class='px-2' onclick="editTask(this);">
					<img class='px-0 btn-svg' src='./assets/imgs/svgs/edit.svg' title='Edit This Task'>
				</div>
				<div class='' onclick="deleteTask(this);">
					<img class='px-0 btn-svg' src='./assets/imgs/svgs/delete-2.svg' title='Delete This Task'>
				</div>
			</div>
		</li>`;
	task_list.innerHTML+=task_list_item;
}
let addTaskError = (task) => {
	if (task.length === 0) {
		return 'A Task cannot be empty';
	}else if (task.length < 3) {
		return 'This Task is too short';
	}else {
		return false;
	}
}
let formatted_text = (text) => {
	let output = text.trim().toLowerCase();
	output = output.charAt(0).toUpperCase() + output.slice(1);
	return output;
}

console.log(add_btn)
console.log(task_input)
task_form.onsubmit = () => {
	event.preventDefault();
	let task = task_input.value;
	handleAddTask(task); 
}

//Functions for crossing tasks:

function toggleCrossTask (btn) {
	let task_li = btn.closest('li');
	let task_text = task_li.querySelector('span.task') ;
	let check_img = task_li.querySelector('img.check-img');
	if (!hasClass(task_li,'crossed')) {
		crossTask(check_img,task_text,task_li);
	}else {
		uncrossTask(check_img,task_text,task_li);
	}
}
function crossTask (img,text,li) {
	img.src = './assets/imgs/svgs/checked-2.svg';
	img.title = 'Uncheck This Task';
	text.classList.add('cross-text');
	li.classList.add('crossed');
	decreaseCounter(pending_counter);

}
function uncrossTask (img,text,li) {
	img.src = './assets/imgs/svgs/checkbox-2.svg';
	img.title = 'Check This Task';
	text.classList.remove('cross-text');
	li.classList.remove('crossed');
	increaseCounter(pending_counter);

}
let hasClass =  (element,class_name) => {
	if (Object.values(element.classList).includes(class_name)) {
		return true;
	}else {
		return false;
	}
}
function editTask (btn) {
	console.log(btn.closest('li'))

}
function deleteTask (btn) {
	console.log(btn.closest('li'))

}
function displayCross() {
	
}

function increaseCounter (element) {
	element.innerText++;
}
function decreaseCounter (element) {
	element.innerText--;
}

 