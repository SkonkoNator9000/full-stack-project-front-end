import { htmlToElement } from "./utils.ts"
import { Task } from "./types.ts"
export const refreshTodos = function (): void {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks`)
    .then((response: Response) => {
      return response.json() as Promise<{ tasks: Task[] }>
    })
    .then(
      (todos: { tasks: { id: number; name: string; priority: string }[] }) => {
        const todoElements = document.querySelectorAll(".todos-container .todo")
        todoElements.forEach((todoElement) => {
          todoElement.remove()
        })
        todos.tasks.forEach((td) => {
          const sp1: ChildNode | null = htmlToElement(
            '<div class="todo">' +
              '    <p class="item ' +
              td.priority +
              '">' +
              td.name +
              "</p>" +
              "    <span>" +
              '        <a href="#" class="edit-todo" data-id="' +
              td.id +
              '"><i class="fas fa-pen"></i></a>' +
              '        <a href="#" class="del-todo" data-id="' +
              td.id +
              '"><i class="fas fa-times fa-lg"></i></a>' +
              "    </span>\n" +
              "</div>",
          )
          const sp2 = document.querySelector(".todos-container .add-todo")

          // Get the parent element
          if (sp1 && sp2 && sp2.parentNode) {
            const parentDiv = sp2.parentNode as HTMLElement
            parentDiv.insertBefore(sp1, sp2)
          }
        })
      },
    )
    .catch((err: unknown) => console.log(err))
}
export const removeTodo = function (id: string | undefined): void {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks/` + id, {
    method: "DELETE",
  })
    .then((response: Response) => {
      if (response.status === 204) {
        refreshTodos()
      }
    })
    .catch((err: unknown) => console.log(err))
}

export const addTodo = function (todo: string, priority: string): void {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      name: todo,
      priority: priority,
    }),
  })
    .then((response: Response) => {
      if (response.status === 201) {
        refreshTodos()
      }
    })
    .catch((err: unknown) => console.log(err))
}

export const editTodo = function (
  todo: string,
  priority: string,
  id: string | undefined,
): void {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks/` + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      name: todo,
      priority: priority,
    }),
  })
    .then((r: Response) => {
      if (r.status === 204) {
        console.log(`Response Status: ${r.status}`)
        refreshTodos()
      }
    })
    .catch((err: unknown) => console.log(err))
}
