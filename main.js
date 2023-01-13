'use strict';

//JSON.stringify(banco) converte o objeto banco em um formato string. Isso é importante para armazenar elementos no localStorage, uma vez que lá é armazenado apenas string.
// JSON.parse(localStorage.getItem("todoList")) converte a string para um objeto

const getBanco = ()  => JSON.parse(localStorage.getItem("todoList")) ?? []; // pega o banco do localStorage. Caso não tenha nada no localStorage, retorna um array vazio
const setBanco = (banco) => localStorage.setItem("todoList", JSON.stringify(banco)); // atualiza o banco no localStorage.


const criarItem = (tarefa, status="", indice) => {
    const item = document.createElement("label");
    item.classList.add("todo__item");
    item.innerHTML = `<input type="checkbox" ${status} data-indice=${indice}>
                      <div>${tarefa}</div>
                      <input type="button" value="x" data-indice=${indice}>`;
    document.getElementById("todoList").appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById("todoList");

    todoList.innerHTML = "";
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach ((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === "Enter") {
        const banco = getBanco();
        banco.push ({'tarefa':texto, 'status':''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = "";
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1); // remove a partir do "indice", até ele mesmo
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === "" ? "checked" : "";
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === "button") {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === "checkbox") {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById("newItem").addEventListener("keypress", inserirItem);
document.getElementById("todoList").addEventListener("click", clickItem);

atualizarTela();
