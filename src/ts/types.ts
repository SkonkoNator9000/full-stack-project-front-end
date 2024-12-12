interface IdNameObject {
  id: number
  name: string
}

export interface Task extends IdNameObject {
  priority: string
}
