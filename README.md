# Lista de Tarefas (To-Do List)

Aplicação de lista de tarefas desenvolvida com **HTML, CSS e JavaScript puro**, sem frameworks ou bibliotecas externas. Projeto criado com foco em aprendizado de lógica de programação e manipulação do DOM.

🔗 **Acesse o projeto online:** [https://ricardocunhaf.github.io/todo-list/](https://ricardocunhaf.github.io/todo-list/)

---

## Funcionalidades

-  Adicionar novas tarefas (pelo botão ou pela tecla **Enter**)
-  Exibir todas as tarefas cadastradas
-  Marcar e desmarcar tarefas como concluídas (texto riscado)
-  Excluir tarefas
-  Validação para impedir tarefas vazias
-  Contador de tarefas pendentes
-  Salvamento automático no **LocalStorage** (as tarefas continuam ao recarregar a página)

---

## Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura da página |
| **CSS3** | Estilização, Flexbox, variáveis CSS e media queries |
| **JavaScript (Vanilla)** | Lógica, manipulação do DOM e LocalStorage |

---

## Conceitos praticados

Este projeto implementa as quatro operações do **CRUD**:

| Operação | Função | Método principal |
|---|---|---|
| **Create** | `adicionarTarefa()` | `push()` |
| **Read** | `renderizarTarefas()` | `forEach()` |
| **Update** | `alternarConclusao()` | `find()` |
| **Delete** | `removerTarefa()` | `findIndex()` + `splice()` |

Outros conceitos aplicados:

- Manipulação do **DOM** (`createElement`, `appendChild`, `classList`)
- **Eventos** (`submit`, `change`, `click`)
- **Arrays e objetos**
- **LocalStorage** com `JSON.stringify()` e `JSON.parse()`
- Tratamento de erros com `try/catch`
- Design responsivo com `@media`

---

## Estrutura do projeto

```
todo-list/
│
├── index.html   # Estrutura da página
├── style.css    # Estilos e responsividade
├── script.js    # Lógica da aplicação
└── README.md    # Documentação
```

---

## Como executar localmente

1. Baixe ou clone este repositório:
   ```bash
   git clone https://github.com/ricardocunhaf/todo-list.git
   ```
2. Abra a pasta do projeto.
3. Dê um duplo clique em `index.html` (ou use a extensão **Live Server** no VS Code).

Não é necessário instalar nada.

---

## Melhorias futuras

- [ ] Botão "Limpar tarefas concluídas"
- [ ] Filtros (Todas, Pendentes, Concluídas)
- [ ] Editar o texto de uma tarefa
- [ ] Data de criação e prioridade
- [ ] Tema claro/escuro
- [ ] Arrastar e soltar para reordenar

---

## 👨‍💻 Autor

Desenvolvido por **Ricardo Cunha**
GitHub: [@ricardocunhaf](https://github.com/ricardocunhaf)
