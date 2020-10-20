function Person(name, age, dob){
    this.name = name;
    this.age = age;
    this.dob = dob;
}

function UI() {};

UI.prototype.addToList = function(person){
    console.log(person);
    const list = document.querySelector('.person-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${person.name}</td>
    <td>${person.age}</td>
    <td>${person.dob}</td>
    <td class = 'delete'><i class="fa fa-trash black" aria-hidden="true"></i></td>
    `;
    list.appendChild(row);
}

UI.prototype.clearAll = function(){
    document.querySelector('.name').value = '';
    document.querySelector('.dob').value = '';
    document.querySelector('.age').value = '';
}

/* UI.prototype.displayLoader = function() {
    
} */

UI.prototype.alertMessage = function(message, color){
    const div = document.createElement('div');
    const submit = document.querySelector('.submit');
    div.appendChild(document.createTextNode(message));
    div.className = `alert ${color}`;
    document.querySelector('.card-body').appendChild(div);
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

document.querySelector('.submit').addEventListener('click', function(e){
    setTimeout(clearLoader, 2000);
    const loadIcon = document.querySelector('.load-icon');
    e.target.style.display = 'none';
    loadIcon.style.display = 'block';
})

document.querySelectorAll('.input').forEach(function(input){
    input.addEventListener('keyup', function(e) {
        if (e.keyCode === 13) {
            setTimeout(clearLoader, 2000);
            const loadIcon = document.querySelector('.load-icon');
            document.querySelector('.submit').style.display = 'none';
            loadIcon.style.display = 'block';
            e.preventDefault();
        }
    })
})

function clearLoader(){
    const loadIcon = document.querySelector('.load-icon');
    const submit = document.querySelector('.submit');
    submit.style.display = 'block';
    loadIcon.style.display = 'none';
    addItem();
}

function addItem(){
    document.querySelector('.submit')
    const name = document.querySelector('.name').value,
    age = document.querySelector('.age').value,
    dob = document.querySelector('.dob').value;

    const person = new Person(name, age, dob);

    const ui = new UI();

    if (name === '' || age === '' || dob === ''){
        ui.alertMessage('Please fill in all fields', 'alert-danger')
    } else {
        ui.alertMessage('Item Added', 'alert-success');
        ui.addToList(person);
    }

    ui.clearAll();
}

document.body.addEventListener('click', function(e){
    if (e.target.parentElement.classList.contains('delete')){
        e.target.parentElement.parentElement.remove();
    }
})