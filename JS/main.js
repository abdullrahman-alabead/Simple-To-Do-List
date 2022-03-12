window.onload = loadTasks;
function loadTasks(){
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    let list = document.querySelector(".tasks");
    let li = document.createElement("li")
    li.classList.add(`task`)
    li.innerHTML = `<input type="text" class="${task.completed? 'completed' : ''}" value="${task.task}">
    <p onclick="removeTask(this)">X</p>
    <p onclick="taskCompleted(this)" class="complete">&#10003;</p>`
    list.insertBefore(li, list.children[0])
  })
}

function addTask(){
  let input = document.querySelector(".adding input")
  if(input.value === ""){
    alert("Enter a Task First...")
    return false ;
  }
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"));
  for(let task of tasks){
    if(task.task === input.value){
      alert("Task already Exist")
      input.value = "";
      return;
    }
  }
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"),{task: input.value, completed: false}]))
  let list = document.querySelector(".tasks")
  let li = document.createElement("li");
  li.classList.add(`task`);
  li.innerHTML = `<input type="text" value="${input.value}">
  <p onclick="removeTask(this)">X</p>
  <p onclick="taskCompleted(this)" class="complete">&#10003;</p>`
  list.insertBefore(li, list.children[0])
  input.value = "";
}
function removeTask(task) {
  //remove from localStorage
  localStorage.removeItem("tasks");
  let removed = task.parentElement
  removed.remove()
  let tasks = Array.from(document.querySelectorAll(".task"));
  tasks.forEach(todo => {
    todo.remove();
    localStorage.setItem("tasks", JSON.stringify([JSON.parse(localStorage.getItem("tasks") || "[]"),{task:todo.children[0].value,completed: todo.children[0].classList.contains("completed")? true : false}]))
    let list = document.querySelector(".tasks");
    let li = document.createElement("li");
    li.classList.add(`task`);
    li.innerHTML = `<input type="text" class=" ${todo.children[0].classList.contains("completed")? 'completed' : ''}" value="${todo.children[0].value}">
    <p onclick="removeTask(this)">X</p>
    <p onclick="taskCompleted(this)" class="complete">&#10003;</p>`
    list.insertBefore(li, list.children[0])
  })
}

function taskCompleted(task){
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"));
  tasks.forEach(todo => {
    if(todo.task === task.parentElement.children[0].value){
      task.completed = !task.completed;
    }
  })
  localStorage.setItem("tasks", JSON.stringify(tasks))
  task.parentElement.children[0].classList.toggle("completed")
}