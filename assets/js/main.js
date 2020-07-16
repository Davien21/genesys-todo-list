/*
*TODO list by Chidiebere Ekennia , Backend Developer at Genesys
*/
//VARIABLE and DOM DECLARATIONS:
let add_btn = document.querySelector('#add-btn');
let task_input = document.querySelector('#task-input');
let task_form = document.querySelector('form.add-form');
let task_list = document.querySelector('#task-display');
let task_counter = document.querySelector('#task-count');

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
function check_if_task_exists (task) {
	for (let i in task_list) {
		console.log(i)
	}
}
// check_if_task_exists()
function addTask (task) {
	addTaskToList(formatted_text(task));
	increaseTaskCounter();

}
function increaseTaskCounter () {
	 task_counter.innerText++;
console.log(task_list)
}
function addTaskToList (task) {
	let task_list_item = 
		`<li class="col-12 d-flex flex-wrap list-group-item paper-box-shadow">
			<div class='col px-0'>
				<span class='task'>${task}</span>
			</div>
			<div class='ml-auto row'>
				<div class=''>
					<img class='px-0 btn-svg' src='./assets/imgs/svgs/check-3.svg' title='Check This Task'>
				</div>
				<div class='px-2'>
					<img class='px-0 btn-svg' src='./assets/imgs/svgs/edit.svg' title='Edit This Task'>
				</div>
				<div class=''>
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
/*Main */
task_form.onsubmit = () => {
	event.preventDefault();
	let task = task_input.value;
	handleAddTask(task); 
}
 