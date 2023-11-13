const button = document.querySelector('.add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []



function adicionarNovaTarefa(){
  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false
  })
  input.value = ''
  mostrarTarefas()
}

function mostrarTarefas(){

  let novaLi = ''
  minhaListaDeItens.forEach( (item, index) => {
    novaLi = novaLi + `
    <li class="task ${item.concluida && "done"}">
          <img class="confirm-delete" src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${index})" />
          <p>${item.tarefa}</p>
          <img class="confirm-delete" src="./img/trash.png" alt="excluir-tarefa"  onclick="deletarItem(${index})"/>
    </li>
    `
  } )

  listaCompleta.innerHTML = novaLi

  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

function concluirTarefa(index){
  minhaListaDeItens[index].concluida = !minhaListaDeItens[index].concluida
  mostrarTarefas()
}

function deletarItem(index){
  minhaListaDeItens.splice(index, 1)
  mostrarTarefas()
}

function recarregarTarefas(){
  const tarefasDoLocalStorage = localStorage.getItem('lista')
  if (tarefasDoLocalStorage){
  minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
  }
  mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)


document.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    const btn = document.querySelector(".add-task");
    btn.click();
  }
})
