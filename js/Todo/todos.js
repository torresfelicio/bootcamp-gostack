var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var todos = JSON.parse(localStorage.getItem('list_todos')) || ['Bem Vindo ao Todo']; // o || significa ou array
//o JSON.parse transforma o json em um array de novo

function renderTodos(){

    listElement.innerHTML = ''; // todo o conteudo que estiver no html referente a variavel le vai receber o vazio
    /* 
    o for cria uma var todo
    e le todos os dados do arrey todos,
    é criado o elemento li e criado o texto
    que é obtido da variavel todos e passado para o todo

    */  
    for (todo of todos) {
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');

        var pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');

        var linkText = document.createTextNode(' Excluir');

        linkElement.appendChild(linkText);
        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
    }
}

renderTodos();

function addTodo(){
    var todoText = inputElement.value;

    todos.push(todoText);  //adiciona no array
    inputElement.value = ''; //apaga o que foi digitado no input
    renderTodos();
    saveToStorage();
}

buttonElement.onclick = addTodo; //fazendo o button adicionar o todo

function deleteTodo(pos){
    todos.splice(pos, 1); //splice remove um array de acordo com a posição passada
    renderTodos();
    saveToStorage();
}

function saveToStorage (){
    //localStorage.setItem('list_todos', todos); estou setando onde salvar na var global localstorage
    
    localStorage.setItem('list_todos', JSON.stringify(todos));
}