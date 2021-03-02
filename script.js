let subjectIndex = -1;
let taskIndex = -1;
let totalExperience = 0;

var subjects = ["Chemistry", "Algebra", "Mathematics"];
var tasks = [
    [
        ["Do Task 1", null], ["Do Task 2", 30], ["Do Task 3", 100] //tasks[0][0], tasks[0][1], ...
    ],
    [
        ["Do Task 4", null], ["Do Task 5", 30], ["Do Task 6", 100] //tasks[1][0], tasks[1][1], ...
    ],
    [
        ["Do Task 8", null], ["Do Task 7", 30], ["Do Task 9", 100] //tasks[2][0], tasks[2][1], ...
    ]
]
var user = ["Gabriel", 3000, 20];
const userNameIndex = 0;
const userXpIndex = 1;
const userTasksDoneIndex = 2;
let levelPercentage = 0;

const subjectsContainer = document.querySelector('.subjects-nav');
const tasksContainer = document.querySelector('.tasks-desc__container');
const formContainer = document.querySelector('.modal__form')
const modal = document.querySelector('.modal');
const modalTask = document.getElementById('taskname');
const modalTimer = document.getElementById('timer');
const modalDeadline = document.getElementById('deadline');


subjects.forEach(function(subject, index) {
    const subjectEl = document.createElement('li');
    subjectEl.classList.add('subjects-nav__item');
    subjectEl.setAttribute('data-tab', index);
    subjectEl.innerHTML = `<a href='#' class='subjects-nav__link'><span>${subject}</span></a>`
    subjectsContainer.append(subjectEl);
})


subjectsContainer.addEventListener('click', function(e) {

    const clicked = e.target.closest('.subjects-nav__item');
    const clickedDataTab = clicked.dataset.tab;
    subjectIndex = clickedDataTab;

    updateTasks();
})


function updateTasks() {
    tasksContainer.innerHTML = '';

    for (var taskIndex in tasks[subjectIndex]) {
        const taskEl = document.createElement('div');
        taskEl.classList.add('tasks-desc__item');
        taskEl.setAttribute('data-tab', taskIndex);
        taskEl.innerHTML = `<div class="tasks-desc__checkbox"><input type="checkbox"><label class="checkbox__label">${tasks[subjectIndex][taskIndex][0]}<label></div><div class="tasks-desc__checkbox-btn"><button class="btn__tasks-edit">Edit</button><button class="btn__tasks-delete">Delete</button></div>`; 
        tasksContainer.append(taskEl);
    }

    const addTaskInputEl = document.createElement('input');
    addTaskInputEl.classList.add('tasks-desc__input');
    addTaskInputEl.placeholder = "Add Task";
    isAddInputExist = true;
    tasksContainer.append(addTaskInputEl);
}  


tasksContainer.addEventListener('keypress', function(e) {
    if (isAddInputExist && e.key === 'Enter') {
        e.preventDefault();
        if (e.target.tagName === 'INPUT') {  
            const newTask = document.querySelector('.tasks-desc__input').value;
            newTaskAr = [newTask, null];
            tasks[subjectIndex].push(newTaskAr);
            updateTasks();  
        }
        // } 
        // else if (e.target.tagName === 'LABEL') {
        //     const clicked = e.target.closest('.tasks-desc__item');
        //     const clickedDataTab = clicked.dataset.tab;
        //     const updatedTask = e.target.textContent; 
        //     tasks[subjectIndex][clickedDataTab][0] = updatedTask;
        //     updateTasks();
        // }
    }
})


tasksContainer.addEventListener('focusin', function(e) {
    const taskElement = document.querySelector('.tasks-desc__item');
    e.target.style.background = "rgb(55,63,94)";
})


tasksContainer.addEventListener('focusout', function(e) {
    const taskElement = document.querySelector('.tasks-desc__item');
    // if (taskElement && e.target.tagName !== 'INPUT' && e.target.textContent) { 
    //     e.target.style.background = '';
    //     const updatedTask = e.target.textContent; 
    //     const updatedIndex = e.target.dataset.tab;
    //     tasks[subjectIndex][updatedIndex][0] = updatedTask;
    // }
});



tasksContainer.addEventListener('click', function(e) {

    const clicked = e.target.closest('.tasks-desc__item');
    taskIndex = clicked.dataset.tab;
    
    if (e.target.classList[0] === 'btn__tasks-delete') {
        tasks[subjectIndex].splice(taskIndex, 1);
        updateTasks();
    } else if (e.target.classList[0] === 'btn__tasks-edit') {
        modal.style.display = "block";
        modalTask.value = tasks[subjectIndex][taskIndex][0];
    }
});

formContainer.addEventListener('click', function(e) {
    if (e.target.classList[0] === 'modal__btn-cancel') {
        modal.style.display = "none";
    } else if (e.target.classList[0] === 'modal__btn-submit') {
        tasks[subjectIndex][taskIndex][0] = modalTask.value;
        updateTasks();
        modal.style.display = "none";
    } 
});

modal.addEventListener('click', function(e) {
    if (e.target.classList[0] === 'modal') {
        modal.style.display = "none";
    }
});


function calcLevel(points) {
    let levelCap = 10;
    let level = 1;

    while(levelCap < points) {
        levelCap *= 1.5;
        level++;
    }

    levelPercentage = (points/levelCap);
    return level;
}


var bar = new ProgressBar.Circle('#progress-circle', {
    color: '#aaa',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#20243c', width: 1 },
    to: { color: '#0062ff', width: 4 },
    // Set default step function for all animate calls
    step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
        circle.setText(calcLevel(user[userXpIndex]));
    }
  });
bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar.text.style.fontSize = '2rem';


bar.animate(0.6);