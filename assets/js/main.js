/*
*TODO list by Chidiebere Ekennia , Backend Developer at Genesys
*/
//VARIABLE and DOM DECLARATIONS:
let add_btn = document.querySelector('#add-btn');
let task_input = document.querySelector('#task-input');
let task_form = document.querySelector('form.add-form');
// let edit_task_form = document.querySelector('form.edit-form');
let task_list = document.querySelector('#task-display');
let task_counter = document.querySelector('#task-count');
let pending_counter = document.querySelector('#pending-count');

//FUNCTIONS FOR ADDING TASKS:
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
		`<li class="col-12 d-flex flex-wrap list-group-item paper-box-shadow ">
			<div class="col px-0 text-cursor">
				<input class="task" value="${task}" onfocus="editTask(this)"/>
			</div>
			<div class="ml-auto row">
				<div class="pr-2" onclick="toggleCrossTask(this);">
					<img class="px-0 btn-svg check-img" src="./assets/imgs/svgs/checkbox-3.svg" title="Check This Task">
				</div>
				 
				<div class="" onclick="deleteTask(this);">
					<img class="px-0 btn-svg" src="./assets/imgs/svgs/delete-2.svg" title="Delete This Task">
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

task_form.onsubmit = () => {
	event.preventDefault();
	let task = task_input.value;
	handleAddTask(task); 
}


//FUNCTIONS FOR CROSSING/CHECKING OUT TASKS:
function toggleCrossTask (btn) {
	let task_li = btn.closest('li');
	let task_text = task_li.querySelector('.task') ;
	let check_img = task_li.querySelector('img.check-img');
	if (!hasClass(task_text,'cross-text')) {
		crossTask(check_img,task_text);
	}else {
		uncrossTask(check_img,task_text);
	}
}
function crossTask (img,text) {
	img.src = './assets/imgs/svgs/checked-2.svg';
	img.title = 'Uncheck This Task';
	text.classList.add('cross-text');
	decreaseCounter(pending_counter);
}
function uncrossTask (img,text) {
	img.src = './assets/imgs/svgs/checkbox-3.svg';
	img.title = 'Check This Task';
	text.classList.remove('cross-text');
	increaseCounter(pending_counter);
}


//FUNCTIONS FOR EDITING TASKS:
function editTask (input) {
	handleEdit(input);
	input.onblur = () => {
		input.value = formatted_text(input.value);
		input.closest('li').classList.remove('highlight');
	}

}
function handleEdit (input)  {
	input.closest('li').classList.add('highlight');
	input.onkeydown = (e) => {
		if (e.keyCode === 13) {
			input.blur();
		}
	}
}
/*These functions are under review for updates to the app*/
function convertToSpan (argument) {
	// body... 
}
function convertToInput (argument) {
	// body... 
}
/*END OF REVIEW*/

//Functions for deleting tasks:
function deleteTask (btn) {
	let task_li = btn.closest('li');
	let task_text = task_li.querySelector('.task') ;
	let isDeleting = confirm('Are you sure you want to remove this To Do?');
	if (isDeleting) {
		task_li.remove();
		decreaseCounter(task_counter);
		if (!hasClass(task_text,'cross-text')) {
			decreaseCounter(pending_counter);
		}
	}
}
/*These are more general functions, available to any activity*/
function increaseCounter (element) {
	element.innerText++;
}
function decreaseCounter (element) {
	element.innerText--;
}

let hasClass =  (element,class_name) => {
	if (Object.values(element.classList).includes(class_name)) {
		return true;
	}else {
		return false;
	}
}
let formatted_text = (text) => {
	let output = text.trim().toLowerCase();
	output = output.charAt(0).toUpperCase() + output.slice(1);
	return output;
}