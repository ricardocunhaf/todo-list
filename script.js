// ===================================
// 1. SELECIONANDO ELEMENTOS DO HTML
// ===================================

const inputTarefa = document.getElementById("input-tarefa");     // campo de texto
const formTarefa = document.getElementById("form-tarefa");       // formulário
const listaTarefas = document.getElementById("lista-tarefas");   // <ul> das tarefas
const contador = document.getElementById("contador");            // contador de pendentes
const mensagemErro = document.getElementById("mensagem-erro");   // erro de validação
const mensagemVazia = document.getElementById("mensagem-vazia"); // "nenhuma tarefa"


// ===================================
// 2. DADOS (ESTADO DA APLICAÇÃO)
// ===================================

// Array que guarda todas as tarefas.
// Cada tarefa: { id: 123, texto: "Estudar JS", concluida: false }
let tarefas = [];

// Nome da "gaveta" do LocalStorage onde as tarefas ficam salvas
const CHAVE_STORAGE = "todo-list-tarefas";


// ===================================
// 3. LOCALSTORAGE (SALVAR E CARREGAR)
// ===================================

// Converte o array em texto JSON e guarda no navegador
function salvarTarefas() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas));
}

// Lê o texto salvo e converte de volta para array
function carregarTarefas() {
  const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);

  if (dadosSalvos !== null) {
    try {
      tarefas = JSON.parse(dadosSalvos);
    } catch (erro) {
      // Se os dados estiverem corrompidos, começa com lista vazia
      console.error("Erro ao ler tarefas salvas:", erro);
      tarefas = [];
    }
  }
}


// ===================================
// 4. CREATE: ADICIONAR TAREFA
// ===================================

function adicionarTarefa(texto) {
  const novaTarefa = {
    id: Date.now(),    // id único baseado na hora atual
    texto: texto,      // texto digitado
    concluida: false   // começa como pendente
  };

  tarefas.push(novaTarefa);  // adiciona no final do array

  salvarTarefas();           // guarda no LocalStorage
  renderizarTarefas();       // redesenha a tela
}


// ===================================
// 5. UPDATE: MARCAR / DESMARCAR COMO CONCLUÍDA
// ===================================

function alternarConclusao(id) {
  // find() devolve o primeiro objeto cujo id seja igual ao procurado
  const tarefa = tarefas.find(function (t) {
    return t.id === id;
  });

  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;  // inverte true <-> false
  }

  salvarTarefas();
  renderizarTarefas();
}


// ===================================
// 6. DELETE: REMOVER TAREFA
// ===================================

function removerTarefa(id) {
  // findIndex() devolve a posição da tarefa (ou -1 se não achar)
  const indice = tarefas.findIndex(function (t) {
    return t.id === id;
  });

  if (indice !== -1) {
    tarefas.splice(indice, 1);  // remove 1 item a partir dessa posição
  }

  salvarTarefas();
  renderizarTarefas();
}


// ===================================
// 7. READ: EXIBIR TAREFAS NA TELA
// ===================================

function renderizarTarefas() {
  // Limpa a lista para não duplicar itens
  listaTarefas.innerHTML = "";

  // Percorre o array e cria um <li> para cada tarefa
  tarefas.forEach(function (tarefa) {

    // Linha da tarefa
    const li = document.createElement("li");
    li.classList.add("tarefa");

    // Se concluída, adiciona a classe que risca o texto (definida no CSS)
    if (tarefa.concluida) {
      li.classList.add("concluida");
    }

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.concluida;
    checkbox.addEventListener("change", function () {
      alternarConclusao(tarefa.id);
    });

    // Texto da tarefa
    const span = document.createElement("span");
    span.classList.add("tarefa-texto");
    span.textContent = tarefa.texto;

    // Botão excluir
    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("btn-excluir");
    botaoExcluir.textContent = "✕";
    botaoExcluir.setAttribute("aria-label", "Excluir tarefa");
    botaoExcluir.addEventListener("click", function () {
      removerTarefa(tarefa.id);
    });

    // Monta a linha e coloca na lista
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(botaoExcluir);
    listaTarefas.appendChild(li);
  });

  atualizarInterface();
}


// ===================================
// 8. ATUALIZAÇÕES AUXILIARES DA INTERFACE
// ===================================

function atualizarInterface() {
  // Mostra "nenhuma tarefa" só quando o array está vazio
  if (tarefas.length === 0) {
    mensagemVazia.style.display = "block";
  } else {
    mensagemVazia.style.display = "none";
  }

  // filter() cria um novo array só com as tarefas pendentes
  const pendentes = tarefas.filter(function (t) {
    return t.concluida === false;
  });

  if (pendentes.length === 1) {
    contador.textContent = "1 tarefa pendente";
  } else {
    contador.textContent = pendentes.length + " tarefas pendentes";
  }
}


// ===================================
// 9. EVENTO: ENVIO DO FORMULÁRIO
// ===================================

formTarefa.addEventListener("submit", function (evento) {
  evento.preventDefault();  // impede a página de recarregar

  const texto = inputTarefa.value.trim();

  // Validação: não aceita tarefa vazia
  if (texto === "") {
    mensagemErro.textContent = "Digite uma tarefa antes de adicionar.";
    inputTarefa.focus();
    return;
  }

  mensagemErro.textContent = "";
  adicionarTarefa(texto);

  inputTarefa.value = "";
  inputTarefa.focus();
});


// ===================================
// 10. INICIALIZAÇÃO (roda ao abrir a página)
// ===================================

carregarTarefas();    // 1º: recupera o que estava salvo
renderizarTarefas();  // 2º: desenha na tela
