import { addTodo, editTodo, refreshTodos, removeTodo } from "./task-api.ts"

const init = function () {
  refreshTodos()
  let editLink: HTMLElement | null

  const container = document.querySelector(".todos-container")
  const containerAdd = document.querySelector("#addTodoModal")
  const containerEditor = document.querySelector("#editTodoModal")
  if (!(container instanceof HTMLElement)) return
  if (!(containerAdd instanceof HTMLElement)) return
  if (!(containerEditor instanceof HTMLElement)) return

  container.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement
    // we'll use event bubbling and can check out the target here
    if (target.classList.contains("fa-times")) {
      const deleteLink = target.parentNode as HTMLElement
      removeTodo(deleteLink.dataset.id)
    }
    if (
      target.classList.contains("fa-plus-circle") ||
      (target.parentNode as HTMLElement).classList.contains("add-todo")
    ) {
      const modal = document.querySelector("#addTodoModal")
      if (modal instanceof HTMLElement) {
        modal.style.display = "block"
        modal.focus()
      }
    }
    if (target.classList.contains("fa-pen")) {
      const modal = document.querySelector("#editTodoModal")
      if (modal instanceof HTMLElement) {
        modal.style.display = "block"
        modal.focus()
      }
      editLink = target.parentNode as HTMLElement
      const editTodoModal: HTMLElement | null =
        document.querySelector("#editTodoModal")
      const input = editTodoModal?.querySelector(".modal-input")
      if (input instanceof HTMLInputElement) {
        input.value = (
          target?.parentNode?.parentNode?.parentNode?.textContent || ""
        ).trim()
      }
      const select = editTodoModal?.querySelector(".modal-select")
      if (select instanceof HTMLSelectElement) {
        select.value = (
          target?.parentNode?.parentNode?.parentNode?.firstElementChild
            ?.classList[1] || ""
        ).trim()
      }
    }
  })
  containerAdd.addEventListener("click", (evt: MouseEvent) => {
    const target = evt.target as HTMLElement
    const editTodoModal = document.querySelector("#addTodoModal")
    //close and cancel button
    if (
      target.classList.contains("close") ||
      target.classList.contains("button-cancel")
    ) {
      if (editTodoModal instanceof HTMLElement) {
        editTodoModal.style.display = "none"
      }
    }
    //add button
    if (target.classList.contains("button-add")) {
      const input = editTodoModal?.querySelector(".modal-input")
      const select = editTodoModal?.querySelector(".modal-select")
      if (
        input instanceof HTMLInputElement &&
        select instanceof HTMLSelectElement
      ) {
        addTodo(input.value, select.value)
      }
      if (editTodoModal instanceof HTMLElement) {
        editTodoModal.style.display = "none"
      }
      if (
        input instanceof HTMLInputElement &&
        select instanceof HTMLSelectElement
      ) {
        input.value = ""
        select.value = "low"
      }
    }
  })

  //    and so on

  containerEditor.addEventListener("click", (evt: MouseEvent) => {
    const target: HTMLElement = evt.target as HTMLElement
    const editTodoModal = document.querySelector("#editTodoModal ")
    //close and cancel button
    if (
      target.classList.contains("close") ||
      target.classList.contains("button-cancel")
    ) {
      if (editTodoModal instanceof HTMLElement) {
        editTodoModal.style.display = "none"
      }
    }
    //edit button
    if (target.classList.contains("button-save")) {
      const input = editTodoModal?.querySelector(".modal-input")
      const select = editTodoModal?.querySelector(".modal-select")
      if (
        input instanceof HTMLInputElement &&
        select instanceof HTMLSelectElement
      ) {
        editTodo(input.value, select.value, editLink?.dataset.id)
      }
      if (editTodoModal instanceof HTMLElement) {
        editTodoModal.style.display = "none"
      }
      if (
        input instanceof HTMLInputElement &&
        select instanceof HTMLSelectElement
      ) {
        input.value = ""
        select.value = "low"
      }
    }
  })
}
init()
